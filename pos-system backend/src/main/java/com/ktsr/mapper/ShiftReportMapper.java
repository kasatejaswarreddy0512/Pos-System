package com.ktsr.mapper;

import com.ktsr.entity.Order;
import com.ktsr.entity.Product;
import com.ktsr.entity.Refund;
import com.ktsr.entity.ShiftReport;
import com.ktsr.payload.DTO.OrderDto;
import com.ktsr.payload.DTO.ProductDto;
import com.ktsr.payload.DTO.RefundDto;
import com.ktsr.payload.DTO.ShiftReportDto;

import java.util.List;
import java.util.stream.Collectors;

public class ShiftReportMapper {

    public static ShiftReportDto toDto(ShiftReport shiftReport){
        return ShiftReportDto.builder()
                .id(shiftReport.getId())
                .shiftStart(shiftReport.getShiftStart())
                .shiftEnd(shiftReport.getShiftEnd())
                .totalSales(shiftReport.getTotalSales())
                .totalRefunds(shiftReport.getTotalRefunds())
                .netSales(shiftReport.getNetSales())
                .totalOrders(shiftReport.getTotalOrders())
                .cashier(UserMapper.toDto(shiftReport.getCashier()))
                .cashierId(shiftReport.getCashier().getId())
                .branchId(shiftReport.getBranch().getId())
                .recentOrders(mapOrders(shiftReport.getRecentOrders()))
                .topSellingProducts(mapProducts(shiftReport.getTopSellingProducts()))
                .refunds(mapRefunds(shiftReport.getRefunds()))
                .paymentSummaries(shiftReport.getPaymentSummaries())
                .build();
    }

    private static List<RefundDto> mapRefunds(List<Refund> refunds) {
        if(refunds==null || refunds.isEmpty()){return  null;}

        return refunds.stream().map(RefundMapper::toDto)
                .collect(Collectors.toList());
    }

    private static List<ProductDto> mapProducts(List<Product> topSellingProducts) {
        if(topSellingProducts==null || topSellingProducts.isEmpty()) return null;

        return topSellingProducts.stream().map(ProductMapper::toDto)
                .collect(Collectors.toList());
    }

    private static List<OrderDto> mapOrders(List<Order> recentOrders) {
        if(recentOrders==null || recentOrders.isEmpty()) return null;

        return recentOrders.stream().map(OrderMapper::toDto)
                .collect(Collectors.toList());
    }


}
