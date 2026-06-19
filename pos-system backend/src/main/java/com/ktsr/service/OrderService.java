package com.ktsr.service;

import com.ktsr.domain.OrderStatus;
import com.ktsr.domain.PaymentType;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.OrderDto;

import java.util.List;

public interface OrderService {

    OrderDto createOrder(OrderDto orderDto) throws UserException;

    OrderDto getOrderById(Long id);

    List<OrderDto> getOrderByBranch(
            Long branchId,
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    );

    List<OrderDto> getOrderByStore(
            Long storeId,
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    );

    List<OrderDto> getMyStoreOrders(
            Long customerId,
            Long cashierId,
            PaymentType paymentType,
            OrderStatus status
    ) throws UserException;

    List<OrderDto> getOrderByCashier(Long cashierId);

    void deleteOrder(Long id);

    List<OrderDto> getTodayOrdersByBranch(Long branchId);

    List<OrderDto> getOrdersByCustomerId(Long customerId);

    List<OrderDto> getTop5RecentOrdersByBranchId(Long branchId);
}