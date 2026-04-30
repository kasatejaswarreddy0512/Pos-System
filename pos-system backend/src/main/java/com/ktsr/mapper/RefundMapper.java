package com.ktsr.mapper;

import com.ktsr.entity.Refund;
import com.ktsr.payload.DTO.RefundDto;

public class RefundMapper {

    public static RefundDto toDto(Refund refund){
        return RefundDto.builder()
                .id(refund.getId())
                .reason(refund.getReason())
                .orderId(refund.getOrder().getId())
                .amount(refund.getAmount())
                .shiftReportId(refund.getShiftReport()!=null? refund.getShiftReport().getId():null)
                .cashierName(refund.getCashier().getFullName())
                .branchId(refund.getBranch().getId())
                .createdAt(refund.getCreatedAt())
                .build();
    }
}
