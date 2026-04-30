package com.ktsr.mapper;

import com.ktsr.entity.Order;
import com.ktsr.payload.DTO.OrderDto;

import java.util.stream.Collectors;

public class OrderMapper {

    public static OrderDto toDto(Order order){
        return OrderDto.builder()
                .id(order.getId())
                .totalAmount(order.getTotalAmount())
                .branchId(order.getBranch().getId())
                .cashier(UserMapper.toDto(order.getCashier()))
                .customer(order.getCustomer())
                .customerId(order.getCustomer() != null ? order.getCustomer().getId() : null)
                .paymentType(order.getPaymentType())
                .orderStatus(order.getOrderStatus())
                .createdAt(order.getCreatedAt())
                .items(order.getItems().stream()
                        .map(OrderItemMapper::toDto)
                        .collect(Collectors.toList()))
                .build();
    }


}
