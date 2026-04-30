package com.ktsr.payload.DTO;

import com.ktsr.entity.Order;
import com.ktsr.entity.Product;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderItemDto {

    private Long id;

    private Integer quantity;

    private Double price;

    private ProductDto product;
    private Long productId;

    private Long orderId;

}
