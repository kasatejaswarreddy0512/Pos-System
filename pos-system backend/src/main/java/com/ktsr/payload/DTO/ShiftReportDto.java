package com.ktsr.payload.DTO;

import com.ktsr.entity.*;
import jakarta.persistence.CascadeType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ShiftReportDto {

    private Long id;

    private LocalDateTime shiftStart;

    private LocalDateTime shiftEnd;

    private  Double totalSales;
    private Double totalRefunds;
    private Double netSales;
    private Integer totalOrders;


    private UserDto cashier;
    private Long cashierId;


    private BranchDto branch;
    private  Long branchId;

    private List<PaymentSummary> paymentSummaries;

    private List<ProductDto> topSellingProducts;

    private List<OrderDto> recentOrders;

    private List<RefundDto> refunds;
}
