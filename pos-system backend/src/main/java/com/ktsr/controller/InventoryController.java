package com.ktsr.controller;

import com.ktsr.payload.DTO.InventoryDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/inventory")
public class InventoryController {

    private  final InventoryService inventoryService;

    @PostMapping
    public ResponseEntity<InventoryDto> createInventory(@RequestBody InventoryDto inventoryDto){
        return new ResponseEntity<>(inventoryService.createInventory(inventoryDto), HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InventoryDto> updateInventory(@PathVariable Long id, @RequestBody InventoryDto inventoryDto){
        return ResponseEntity.ok(inventoryService.updateInventory(id, inventoryDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteInventory(@PathVariable Long id){
        inventoryService.deleteInventory(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Inventory Deleted Successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InventoryDto> getInventoryById(@PathVariable Long id){
        return ResponseEntity.ok(inventoryService.getInventory(id));
    }

    @GetMapping("/branch/{branchId}")
    public ResponseEntity<List<InventoryDto>> getAllInventoryByBranchId(@PathVariable Long branchId){
        return ResponseEntity.ok(inventoryService.getAllInventoryByBranch(branchId));
    }

    @GetMapping("/product/{productId}/branch/{branchId}")
    public ResponseEntity<InventoryDto> getInventoryByProductIdAndBranchId(@PathVariable Long branchId,
                                                                           @PathVariable Long productId){
        return ResponseEntity.ok(inventoryService.getInventoryByProductIdAndBranchId(productId,branchId));
    }

}
