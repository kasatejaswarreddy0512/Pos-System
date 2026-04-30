package com.ktsr.payload.DTO;

import com.ktsr.domain.OrderStatus;
import com.ktsr.domain.PaymentType;
import com.ktsr.entity.Branch;
import com.ktsr.entity.Customer;
import com.ktsr.entity.OrderItem;
import com.ktsr.entity.User;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class OrderDto {

    private Long id;

    private Double totalAmount;

    private LocalDateTime createdAt;

    private PaymentType paymentType;
    private OrderStatus orderStatus;

    private BranchDto branch;
    private Long branchId;

    private UserDto cashier;

    private Customer customer;
    private  Long customerId;


    private List<OrderItemDto> items;


}
