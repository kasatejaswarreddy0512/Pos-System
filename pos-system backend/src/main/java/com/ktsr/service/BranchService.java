package com.ktsr.service;

import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.BranchDto;

import java.util.List;

public interface BranchService {

    BranchDto createBranch(BranchDto branchDto) throws UserException;

    BranchDto getBranchById(Long id);

    BranchDto updateBranch(Long id, BranchDto branchDto);

    void deleteBranch(Long id);

    List<BranchDto> getAllBranchesBYStoreId(Long storeId);
    List<BranchDto> getBranchesForCurrentStoreAdmin() throws UserException;
}
