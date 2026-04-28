package com.ktsr.payload.DTO;

import com.ktsr.entity.Store;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {

    private Long id;

    private String name;

    private String sku;

    private  String description;

    private Double mrp;

    private CategoryDto category;

    private Double sellingPrice;

    private String brand;

    private String image;

     private Long categoryId;

    private Long storeId;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;
}
