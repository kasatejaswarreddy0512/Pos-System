package com.ktsr.entity;

import com.ktsr.domain.StoreStatus;
import com.razorpay.Payment;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
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

    @ManyToMany
    @JoinTable(
            name = "shift_report_top_selling_products",
            joinColumns = @JoinColumn(name = "shift_report_id"),
            inverseJoinColumns = @JoinColumn(name = "product_id")
    )
    private List<Product> topSellingProducts = new ArrayList<>();

    @OneToMany(cascade = CascadeType.ALL)
    private List<Order> recentOrders;

    @OneToMany(cascade = CascadeType.ALL, mappedBy = "shiftReport")
    private List<Refund> refunds;

}
