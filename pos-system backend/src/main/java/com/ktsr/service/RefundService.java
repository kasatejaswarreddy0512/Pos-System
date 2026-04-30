package com.ktsr.service;

import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.RefundDto;

import java.time.LocalDateTime;
import java.util.List;

public interface RefundService {

    RefundDto createRefund(RefundDto refundDto) throws UserException;
    List<RefundDto> getAllRefunds();
    List<RefundDto> getRefundByCashier(Long cashierId);
    List<RefundDto> getRefundByShiftReport(Long shiftReportId);
    List<RefundDto> getRefundByCashierAndDateRange(Long cashierId,
                                                   LocalDateTime startDate,
                                                   LocalDateTime endDate);

    List<RefundDto> getRefundByBranch(Long branchId);

    RefundDto getRefundById(Long id);
    void deleteRefund(Long id);
}
