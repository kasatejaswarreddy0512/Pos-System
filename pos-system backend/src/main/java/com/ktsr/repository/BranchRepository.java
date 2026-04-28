package com.ktsr.repository;

import com.ktsr.entity.Branch;
import com.ktsr.payload.DTO.BranchDto;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BranchRepository extends JpaRepository<Branch , Long> {

    List<Branch> findByStoreId(Long storeId);
}
