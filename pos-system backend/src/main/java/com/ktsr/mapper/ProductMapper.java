package com.ktsr.mapper;

import com.ktsr.entity.Category;
import com.ktsr.entity.Product;
import com.ktsr.entity.Store;
import com.ktsr.payload.DTO.ProductDto;

public class ProductMapper {

    public static ProductDto toDto(Product product){
        return  ProductDto.builder()
                .id(product.getId())
                .name(product.getName())
                .brand(product.getBrand())
                .description(product.getDescription())
                .mrp(product.getMrp())
                .sellingPrice(product.getSellingPrice())
                .sku(product.getSku())
                .category(CategoryMapper.toDto(product.getCategory()))
                .storeId(product.getStore() != null ? product.getStore().getId() : null)
                .image(product.getImage())
                .createdAt(product.getCreatedAt())
                .updatedAt(product.getUpdatedAt())
                .build();
    }

    public static Product toEntity(ProductDto productDto, Store store, Category category){
        return Product.builder()
                .name(productDto.getName())
                .store(store)
                .category(category)
                .brand(productDto.getBrand())
                .sku(productDto.getSku())
                .description(productDto.getDescription())
                .mrp(productDto.getMrp())
                .sellingPrice(productDto.getSellingPrice())
                .image(productDto.getImage())
                .build();
    }
}
