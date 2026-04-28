package com.ktsr.controller;

import com.ktsr.entity.Branch;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.BranchDto;
import com.ktsr.payload.response.ApiResponse;
import com.ktsr.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/branch")
public class BranchController {

    private final BranchService branchService;

    @PostMapping
    public ResponseEntity<BranchDto> createBranch(@RequestBody BranchDto branchDto) throws UserException {

        BranchDto createdBranch= branchService.createBranch(branchDto);
        return new ResponseEntity<>(createdBranch, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<BranchDto> getBranchById(@PathVariable Long id) throws UserException {
        return ResponseEntity.ok(branchService.getBranchById(id));
    }

    @GetMapping("/store/{storeId}")
    public ResponseEntity<List<BranchDto>> getBranchByStoreId(@PathVariable Long storeId) throws UserException {
        return ResponseEntity.ok(branchService.getAllBranchesBYStoreId(storeId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BranchDto> updateBranch(@PathVariable Long id, @RequestBody BranchDto branchDto){
        return ResponseEntity.ok(branchService.updateBranch(id, branchDto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteBranch(@PathVariable Long id) throws UserException {
        branchService.deleteBranch(id);
        ApiResponse apiResponse= new ApiResponse();
        apiResponse.setMessage("Branch Deleted successfully...!");
        return ResponseEntity.ok(apiResponse);
    }

}
