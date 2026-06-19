package com.ktsr.service.impl;

import com.ktsr.domain.OrderStatus;
import com.ktsr.domain.PaymentType;
import com.ktsr.entity.*;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.OrderMapper;
import com.ktsr.payload.DTO.OrderDto;
import com.ktsr.repository.CustomerRepository;
import com.ktsr.repository.OrderItemRepository;
import com.ktsr.repository.OrderRepository;
import com.ktsr.repository.ProductRepository;
import com.ktsr.repository.StoreRepository;
import com.ktsr.service.OrderService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserService userService;
    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;
    private final CustomerRepository customerRepository;
    private final StoreRepository storeRepository;

    @Override
    public OrderDto createOrder(OrderDto orderDto) throws UserException {

        User cashier = userService.getCurrentUser();

        Branch branch = cashier.getBranch();

        if (branch == null) {
            throw new RuntimeException("Cashier Branch Not Found...!");
        }

        Customer customer = null;

        if (orderDto.getCustomerId() != null) {
            customer = customerRepository.findById(orderDto.getCustomerId())
                    .orElseThrow(() -> new RuntimeException("Customer Not Found"));
        }

        Order order = Order.builder()
                .branch(branch)
                .cashier(cashier)
                .customer(customer)
                .paymentType(orderDto.getPaymentType())
                .orderStatus(OrderStatus.COMPLETED)
                .build();

        List<OrderItem> orderItems = orderDto.getItems().stream()
                .map(itemDto -> {
                    Product product = productRepository.findById(itemDto.getProductId())
                            .orElseThrow(() -> new RuntimeException("Product Not Found"));

                    return OrderItem.builder()
                            .product(product)
                            .quantity(itemDto.getQuantity())
                            .price(product.getSellingPrice() * itemDto.getQuantity())
                            .order(order)
                            .build();
                })
                .toList();

        double total = orderItems.stream()
                .mapToDouble(OrderItem::getPrice)
                .sum();

        order.setTotalAmount(total);
        order.setItems(orderItems);

        Order savedOrder = orderRepository.save(order);

        return OrderMapper.toDto(savedOrder);
    }

    @Override
    public OrderDto getOrderById(Long id) {
        return orderRepository.findById(id)
                .map(OrderMapper::toDto)
                .orElseThrow(() -> new RuntimeException("Order Not Found With Id : " + id));
    }

    @Override
    public List<OrderDto> getOrderByBranch(
            Long branchId,
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    ) {
        return filterOrders(
                orderRepository.findByBranchId(branchId),
                customerId,
                cashierId,
                paymentType,
                status
        );
    }

    @Override
    public List<OrderDto> getOrderByStore(
            Long storeId,
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    ) {
        return filterOrders(
                orderRepository.findByBranch_Store_Id(storeId),
                customerId,
                cashierId,
                paymentType,
                status
        );
    }

    @Override
    public List<OrderDto> getMyStoreOrders(
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    ) throws UserException {

        Store store = getCurrentUserStore();

        return getOrderByStore(
                store.getId(),
                customerId,
                cashierId,
                paymentType,
                status
        );
    }

    @Override
    public List<OrderDto> getOrderByCashier(Long cashierId) {
        return orderRepository.findByCashierId(cashierId)
                .stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order Not Found with id : " + id));

        orderRepository.delete(order);
    }

    @Override
    public List<OrderDto> getTodayOrdersByBranch(Long branchId) {
        LocalDate today = LocalDate.now();

        LocalDateTime start = today.atStartOfDay();
        LocalDateTime end = today.plusDays(1).atStartOfDay();

        return orderRepository.findByBranchIdAndCreatedAtBetween(branchId, start, end)
                .stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getOrdersByCustomerId(Long customerId) {
        return orderRepository.findByCustomerId(customerId)
                .stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId) {
        return orderRepository.findTo5ByBranchIdOrderByCreatedAtDesc(branchId)
                .stream()
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    private List<OrderDto> filterOrders(
            List<Order> orders,
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    ) {
        return orders.stream()
                .filter(order ->
                        customerId == null ||
                                (
                                        order.getCustomer() != null &&
                                                order.getCustomer().getId().equals(customerId)
                                )
                )
                .filter(order ->
                        cashierId == null ||
                                (
                                        order.getCashier() != null &&
                                                order.getCashier().getId().equals(cashierId)
                                )
                )
                .filter(order ->
                        paymentType == null ||
                                order.getPaymentType() == paymentType
                )
                .filter(order ->
                        status == null ||
                                order.getOrderStatus() == status
                )
                .map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }

    private Store getCurrentUserStore() throws UserException {
        User currentUser = userService.getCurrentUser();

        Store store = currentUser.getStore();

        if (store == null) {
            store = storeRepository.findByStoreAdminId(currentUser.getId());
        }

        if (store == null) {
            throw new RuntimeException("Store not found for current Store Admin");
        }

        return store;
    }
}