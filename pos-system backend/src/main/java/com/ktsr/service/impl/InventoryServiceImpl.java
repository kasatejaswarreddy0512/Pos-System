package com.ktsr.service.impl;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Inventory;
import com.ktsr.entity.Product;
import com.ktsr.mapper.InventoryMapper;
import com.ktsr.payload.DTO.InventoryDto;
import com.ktsr.repository.BranchRepository;
import com.ktsr.repository.InventoryRepository;
import com.ktsr.repository.ProductRepository;
import com.ktsr.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InventoryServiceImpl implements InventoryService {

    private final InventoryRepository inventoryRepository;
    private final BranchRepository branchRepository;
    private final ProductRepository productRepository;

    @Override
    public InventoryDto createInventory(InventoryDto inventoryDto) {
        Branch branch=branchRepository.findById(inventoryDto.getBranchId()).orElseThrow(
                ()-> new RuntimeException("Branch Not Found..!"));

        Product product=productRepository.findById(inventoryDto.getProductId()).orElseThrow(
                ()-> new RuntimeException("Product Not Found...!"));

        Inventory inventory= InventoryMapper.toEntity(inventoryDto,branch,product);

        Inventory savedInventory= inventoryRepository.save(inventory);

        return InventoryMapper.toDto(savedInventory);
    }

    @Override
    public InventoryDto updateInventory(Long id, InventoryDto inventoryDto) {
        Inventory inventory= inventoryRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Inventory Not Found...!"));

        inventory.setQuantity(inventoryDto.getQuantity());
        inventory.setLastUpdate(inventoryDto.getLastUpdate());
        Inventory updateInventory= inventoryRepository.save(inventory);

        return InventoryMapper.toDto(updateInventory);
    }

    @Override
    public void deleteInventory(Long id) {
        Inventory inventory= inventoryRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Inventory Not Found...!"));
        inventoryRepository.delete(inventory);
    }

    @Override
    public InventoryDto getInventory(Long id) {
        Inventory inventory= inventoryRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Inventory Not Found...!"));
        return InventoryMapper.toDto(inventory);
    }

    @Override
    public InventoryDto getInventoryByProductIdAndBranchId(Long productId, Long branchId) {
        Inventory inventory=inventoryRepository.findByProductIdAndBranchId(productId,branchId);
        return InventoryMapper.toDto(inventory);
    }

    @Override
    public List<InventoryDto> getAllInventoryByBranch(Long branchId) {
        List<Inventory> inventories=inventoryRepository.findByBranchId(branchId);
        return inventories.stream().map(InventoryMapper::toDto)
                .collect(Collectors.toList());
    }
}
