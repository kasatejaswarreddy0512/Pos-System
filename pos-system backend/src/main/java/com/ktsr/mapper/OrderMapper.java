package com.ktsr.mapper;

import com.ktsr.entity.Order;
import com.ktsr.payload.DTO.OrderDto;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto toDto(Order order) {
        return OrderDto.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .createdAt(order.getCreatedAt())
                .paymentType(order.getPaymentType())
                .orderStatus(order.getOrderStatus())
                .branchId(order.getBranch() != null ? order.getBranch().getId() : null)
                .branch(order.getBranch() != null ? BranchMapper.toDto(order.getBranch()) : null)
                .cashier(order.getCashier() != null ? UserMapper.toDto(order.getCashier()) : null)
                .customer(order.getCustomer())
                .customerId(order.getCustomer() != null ? order.getCustomer().getId() : null)
                .items(order.getItems() != null
                        ? order.getItems().stream().map(OrderItemMapper::toDto).toList()
                        : null)
                .build();
    }


}
