package com.ktsr.repository;

import com.ktsr.entity.Refund;
import com.ktsr.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface RefundRepository extends JpaRepository<Refund, Long> {

    List<Refund> findByCashierIdAndCreatedAtBetween(Long cashierId, LocalDateTime startTime, LocalDateTime endTime);

    List<Refund> findByCashierId(Long cashierId);

    List<Refund> findByShiftReportId(Long id);

    List<Refund> findByBranchId(Long branchId);




}
