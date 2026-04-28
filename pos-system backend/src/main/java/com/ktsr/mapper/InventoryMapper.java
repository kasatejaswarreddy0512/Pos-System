package com.ktsr.mapper;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Inventory;
import com.ktsr.entity.Product;
import com.ktsr.payload.DTO.InventoryDto;

import java.time.LocalDateTime;

public class InventoryMapper {

    public static InventoryDto toDto(Inventory inventory){
        return InventoryDto.builder()
                .id(inventory.getId())
                .branchId(inventory.getBranch().getId())
                .productId(inventory.getProduct().getId())
                .product(ProductMapper.toDto(inventory.getProduct()))
                .quantity(inventory.getQuantity())
                .lastUpdate(LocalDateTime.now())
                .build();
    }

    public static Inventory toEntity(InventoryDto inventoryDto, Branch branch, Product product){
        return Inventory.builder()
                .branch(branch)
                .product(product)
                .quantity(inventoryDto.getQuantity())
                .lastUpdate(inventoryDto.getLastUpdate())
                .build();
    }
}
