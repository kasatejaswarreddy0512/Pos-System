package com.ktsr.mapper;

import com.ktsr.entity.OrderItem;
import com.ktsr.payload.DTO.OrderDto;
import com.ktsr.payload.DTO.OrderItemDto;

public class OrderItemMapper {

    public static OrderItemDto toDto(OrderItem item){

        if(item==null) return  null;

        return OrderItemDto.builder()
                .id(item.getId())
                .productId(item.getProduct().getId())
                .quantity(item.getQuantity())
                .price(item.getPrice())
                .product(ProductMapper.toDto(item.getProduct()))
                .orderId(item.getOrder() != null ? item.getOrder().getId() : null)
                .build();

    }
}
