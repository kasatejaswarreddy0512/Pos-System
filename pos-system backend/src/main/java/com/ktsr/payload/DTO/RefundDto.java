package com.ktsr.payload.DTO;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.ktsr.domain.PaymentType;
import com.ktsr.entity.Branch;
import com.ktsr.entity.Order;
import com.ktsr.entity.ShiftReport;
import com.ktsr.entity.User;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RefundDto {

    private Long id;


    private OrderDto order;
    private  Long orderId;

    private String reason;

    private Double amount;

//    private ShiftReport shiftReport;
    private Long shiftReportId;

    private UserDto cashier;
    private String cashierName;

    private BranchDto branch;
    private Long branchId;

    private PaymentType paymentType;

    private LocalDateTime createdAt;
}
