package com.ktsr.entity;

import com.ktsr.domain.StoreStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false, unique = true)
    private String sku;

    private  String description;

    @Column(nullable = false)
    private Double mrp;

    @Column(nullable = false)
    private Double sellingPrice;

    private String brand;

     private String image;

     @ManyToOne
     private Category category;

     @ManyToOne
     private Store store;

     private LocalDateTime createdAt;

     private LocalDateTime updatedAt;

    @PrePersist
    protected  void onCreate(){
        createdAt= LocalDateTime.now();
    }

    @PreUpdate
    protected  void onUpdate(){
        updatedAt=LocalDateTime.now();
    }



}
