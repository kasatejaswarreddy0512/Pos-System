package com.ktsr.mapper;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Store;
import com.ktsr.payload.DTO.BranchDto;

import java.time.LocalDateTime;

public class BranchMapper {

    public static BranchDto toDto(Branch branch){
        return  BranchDto.builder()
                .id(branch.getId())
                .name(branch.getName())
                .address(branch.getAddress())
                .phone(branch.getPhone())
                .email(branch.getEmail())
                .closeTime(branch.getCloseTime())
                .openTime(branch.getOpenTime())
                .workingDays(branch.getWorkingDays())
                .storeId(branch.getStore()!=null ? branch.getStore().getId(): null)
                .createdAt(branch.getCreatedAt())
                .updatedAt(branch.getUpdatedAt())
                .build();
    }

    public static Branch toEntity(BranchDto branchDto, Store store){
        return Branch.builder()
                .id(branchDto.getId())
                .name(branchDto.getName())
                .address(branchDto.getAddress())
                .phone(branchDto.getPhone())
                .email(branchDto.getEmail())
                .store(store)
                .closeTime(branchDto.getCloseTime())
                .openTime(branchDto.getOpenTime())
                .workingDays(branchDto.getWorkingDays())
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();

    }
}
