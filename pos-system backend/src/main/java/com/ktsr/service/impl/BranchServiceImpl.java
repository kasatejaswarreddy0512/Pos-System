package com.ktsr.service.impl;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Store;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.BranchMapper;
import com.ktsr.payload.DTO.BranchDto;
import com.ktsr.repository.BranchRepository;
import com.ktsr.repository.StoreRepository;
import com.ktsr.service.BranchService;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class BranchServiceImpl implements BranchService {

    private final BranchRepository branchRepository;
    private final StoreRepository storeRepository;
    private final UserService userService;

    @Override
    public BranchDto createBranch(BranchDto branchDto) throws UserException {
        User currentUser= userService.getCurrentUser();
        Store store= storeRepository.findByStoreAdminId(currentUser.getId());

        Branch branch= BranchMapper.toEntity(branchDto,store);
        Branch saveBranch=branchRepository.save(branch);

        return BranchMapper.toDto(saveBranch);
    }

    @Override
    public BranchDto getBranchById(Long id) {
        Branch existingBranch=branchRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Branch Not Found..!"));

        return BranchMapper.toDto(existingBranch);
    }

    @Override
    public BranchDto updateBranch(Long id, BranchDto branchDto) {
        Branch existingBranch=branchRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Branch Not Found..!"));

        existingBranch.setName(branchDto.getName());
        existingBranch.setWorkingDays(branchDto.getWorkingDays());
        existingBranch.setAddress(branchDto.getAddress());
        existingBranch.setEmail(branchDto.getEmail());
        existingBranch.setPhone(branchDto.getPhone());
        existingBranch.setCloseTime(branchDto.getCloseTime());
        existingBranch.setOpenTime(branchDto.getOpenTime());
        existingBranch.setUpdatedAt(LocalDateTime.now());

        Branch updateBranch= branchRepository.save(existingBranch);
        return BranchMapper.toDto(updateBranch);
    }

    @Override
    public void deleteBranch(Long id) {
        Branch existingBranch=branchRepository.findById(id).orElseThrow(
                ()-> new RuntimeException("Branch Not Found..!"));
        branchRepository.delete(existingBranch);
    }

    @Override
    public List<BranchDto> getAllBranchesBYStoreId(Long storeId) {
        List<Branch> branch=branchRepository.findByStoreId(storeId);
        return branch.stream().map(
                BranchMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<BranchDto> getBranchesForCurrentStoreAdmin() throws UserException {

        User currentUser = userService.getCurrentUser();

        Store store = currentUser.getStore();

        if (store == null) {
            store = storeRepository.findByStoreAdminId(currentUser.getId());
        }

        if (store == null) {
            throw new RuntimeException("Store not found for current store admin");
        }

        List<Branch> branches = branchRepository.findByStoreId(store.getId());

        return branches.stream()
                .map(BranchMapper::toDto)
                .collect(Collectors.toList());
    }
}
