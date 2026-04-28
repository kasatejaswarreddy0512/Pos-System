package com.ktsr.service;

import com.ktsr.payload.DTO.InventoryDto;

import java.util.List;

public interface InventoryService {

    InventoryDto createInventory(InventoryDto  inventoryDto);

    InventoryDto updateInventory(Long id, InventoryDto  inventoryDto);

    void deleteInventory(Long id);

    InventoryDto getInventory(Long id);

    InventoryDto getInventoryByProductIdAndBranchId(Long productId, Long branchId);

    List<InventoryDto> getAllInventoryByBranch(Long branchId);

}
