package com.ktsr.entity;

import com.ktsr.domain.PaymentType;
import lombok.Data;

@Data
public class PaymentSummary {

    private PaymentType paymentType;
    private Double totalAmount;
    private  Integer transactionCount;
    private  Double percentage;

}
