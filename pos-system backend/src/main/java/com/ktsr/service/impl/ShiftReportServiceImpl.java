package com.ktsr.service.impl;

import com.ktsr.domain.PaymentType;
import com.ktsr.entity.*;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.ShiftReportMapper;
import com.ktsr.payload.DTO.ShiftReportDto;
import com.ktsr.repository.*;
import com.ktsr.service.ShiftReportService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ShiftReportServiceImpl implements ShiftReportService {

    private final ShiftReportRepository shiftReportRepository;
    private  final UserService userService;
    private final BranchRepository branchRepository;
    private final RefundRepository refundRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    @Override
    public ShiftReportDto startShift() throws UserException {

        User currentUser=userService.getCurrentUser();

        LocalDateTime shiftStart=LocalDateTime.now();
        LocalDateTime startOfDay=shiftStart.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfDay= shiftStart.withHour(23).withMinute(59).withSecond(59);

        Optional<ShiftReport> existing=shiftReportRepository.findByCashierAndShiftStartBetween(
                currentUser,startOfDay,endOfDay);
        if (existing.isPresent()){
            throw  new RuntimeException("Shift Already Start Today...!");
        }

        Branch branch=currentUser.getBranch();

        ShiftReport shiftReport=ShiftReport.builder()
                .cashier(currentUser)
                .shiftStart(shiftStart)
                .branch(branch)
                .build();

        ShiftReport savedShiftReport= shiftReportRepository.save(shiftReport);


        return ShiftReportMapper.toDto(savedShiftReport);
    }

    @Override
    public ShiftReportDto endShift() throws UserException {

        User currentUser = userService.getCurrentUser();

        ShiftReport shiftReport = shiftReportRepository
                .findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(currentUser)
                .orElseThrow(() -> new RuntimeException("Shift Not Found...!"));

        shiftReport.setShiftEnd(LocalDateTime.now());

        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(
                currentUser.getId(),
                shiftReport.getShiftStart(),
                shiftReport.getShiftEnd()
        );

        Double totalRefunds = refunds.stream()
                .mapToDouble(refund -> refund.getAmount() != null ? refund.getAmount() : 0.0)
                .sum();

        List<Order> orders = orderRepository.findByCashierAndCreatedAtBetween(
                currentUser,
                shiftReport.getShiftStart(),
                shiftReport.getShiftEnd()
        );

        Double totalSales = orders.stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                .sum();

        Integer totalOrders = orders.size();

        Double netSales = totalSales - totalRefunds;

        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setTotalSales(totalSales);
        shiftReport.setTotalOrders(totalOrders);
        shiftReport.setNetSales(netSales);
        shiftReport.setRecentOrders(getRecentOrders(orders));
        shiftReport.setTopSellingProducts(getTopSellingProducts(orders));
        shiftReport.setPaymentSummaries(getPaymentSummaries(orders, totalSales));
        shiftReport.setRefunds(refunds);

        ShiftReport savedReport = shiftReportRepository.save(shiftReport);

        return ShiftReportMapper.toDto(savedReport);
    }

    @Override
    public ShiftReportDto getShiftReportById(Long id) {
        return shiftReportRepository.findById(id)
                .map(ShiftReportMapper::toDto).orElseThrow(()-> new RuntimeException("Shift Report Not Found...!"));
    }

    @Override
    public List<ShiftReportDto> getAllShiftReports() {
        List<ShiftReport> shiftReports=shiftReportRepository.findAll();
        return shiftReports.stream()
                .map(ShiftReportMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportByBranchId(Long branchId) {
        List<ShiftReport> shiftReports=shiftReportRepository.findByBranchId(branchId);
        return shiftReports.stream()
                .map(ShiftReportMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<ShiftReportDto> getShiftReportByCashierId(Long cashierId) {
        List<ShiftReport> shiftReports= shiftReportRepository.findByCashierId(cashierId);
        return shiftReports.stream()
                .map(ShiftReportMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public ShiftReportDto getCurrentShiftProgress(Long cashierId) throws UserException {

        User currentUser = userService.getCurrentUser();

        ShiftReport shiftReport = shiftReportRepository
                .findTopByCashierAndShiftEndIsNullOrderByShiftStartDesc(currentUser)
                .orElseThrow(() -> new RuntimeException("No Active Shift Found Cashier...!"));

        LocalDateTime now = LocalDateTime.now();

        List<Order> orders = orderRepository.findByCashierAndCreatedAtBetween(
                currentUser,
                shiftReport.getShiftStart(),
                now
        );

        List<Refund> refunds = refundRepository.findByCashierIdAndCreatedAtBetween(
                currentUser.getId(),
                shiftReport.getShiftStart(),
                now
        );

        Double totalRefunds = refunds.stream()
                .mapToDouble(refund -> refund.getAmount() != null ? refund.getAmount() : 0.0)
                .sum();

        Double totalSales = orders.stream()
                .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                .sum();

        Integer totalOrders = orders.size();

        Double netSales = totalSales - totalRefunds;

        shiftReport.setTotalRefunds(totalRefunds);
        shiftReport.setTotalSales(totalSales);
        shiftReport.setTotalOrders(totalOrders);
        shiftReport.setNetSales(netSales);
        shiftReport.setRecentOrders(getRecentOrders(orders));
        shiftReport.setTopSellingProducts(getTopSellingProducts(orders));
        shiftReport.setPaymentSummaries(getPaymentSummaries(orders, totalSales));
        shiftReport.setRefunds(refunds);

        return ShiftReportMapper.toDto(shiftReport);
    }

    @Override
    public ShiftReportDto getShiftByCashierAndDate(Long cashierId, LocalDateTime date) {

        User cashier= userRepository.findById(cashierId).orElseThrow(
                ()-> new RuntimeException("Cashier Not Found...!"));

        LocalDateTime start= date.withHour(0).withMinute(0).withSecond(0);
        LocalDateTime end=date.withHour(23).withMinute(59).withSecond(59);

        ShiftReport shiftReport= shiftReportRepository.findByCashierAndShiftStartBetween(cashier,start,end)
                .orElseThrow(()-> new RuntimeException("Shift Report Not Found For Date...!"));

        return ShiftReportMapper.toDto(shiftReport);
    }


    //-------------------Helper Methods-----------------------------------//


    private List<PaymentSummary> getPaymentSummaries(List<Order> orders, Double totalSales) {
        if (orders == null || orders.isEmpty() || totalSales == null || totalSales == 0) {
            return new ArrayList<>();
        }

        Map<PaymentType, List<Order>> grouped = orders.stream()
                .collect(Collectors.groupingBy(order -> order.getPaymentType() != null
                        ? order.getPaymentType()
                        : PaymentType.CASH));

        List<PaymentSummary> summaries = new ArrayList<>();

        for (Map.Entry<PaymentType, List<Order>> entry : grouped.entrySet()) {
            Double amount = entry.getValue().stream()
                    .mapToDouble(order -> order.getTotalAmount() != null ? order.getTotalAmount() : 0.0)
                    .sum();

            int transaction = entry.getValue().size();
            Double percentage = totalSales > 0 ? (amount / totalSales) * 100 : 0.0;

            PaymentSummary summary = new PaymentSummary();
            summary.setPaymentType(entry.getKey());
            summary.setTotalAmount(amount);
            summary.setTransactionCount(transaction);
            summary.setPercentage(percentage);

            summaries.add(summary);
        }

        return summaries;
    }

    private List<Product> getTopSellingProducts(List<Order> orders) {
        Map<Product, Integer> productSalesMap=new HashMap<>();

        for(Order order:orders){
            for(OrderItem orderItem: order.getItems()){
                Product product=orderItem.getProduct();
                productSalesMap.put(product,productSalesMap.getOrDefault(product,0)
                        +orderItem.getQuantity());

            }
        }
        return productSalesMap.entrySet().stream()
                .sorted((a,b)-> b.getValue().compareTo(a.getValue()))
                .limit(5)
                .map(Map.Entry::getKey)
                .collect(Collectors.toList());
    }

    private List<Order> getRecentOrders(List<Order> orders) {
        return orders.stream()
                .sorted(Comparator.comparing(Order::getCreatedAt).reversed())
                .limit(5)
                .collect(Collectors.toList());
    }
}
