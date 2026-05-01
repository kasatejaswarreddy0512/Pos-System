package com.ktsr.entity;

import com.ktsr.domain.StoreStatus;
import com.razorpay.Payment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ShiftReport {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime shiftStart;

    private LocalDateTime shiftEnd;

    private  Double totalSales;
    private Double totalRefunds;
    private Double netSales;
    private Integer totalOrders;

    @ManyToOne
    private  User cashier;

    @ManyToOne
    private  Branch branch;

    @Transient
    private List<PaymentSummary> paymentSummaries;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Product> topSellingProducts;

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> recentOrders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "shiftReport")
    private List<Refund> refunds;

}
