package com.ktsr.entity;

import com.ktsr.domain.StoreStatus;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String brand;

    @OneToOne
    private User storeAdmin;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    private String description;

    private String storeType;

    @Enumerated(EnumType.STRING)
    private StoreStatus status;

    @Embedded
    private StoreContact contact= new StoreContact();

    @PrePersist
    protected  void onCreate(){
        createdAt= LocalDateTime.now();
        status=StoreStatus.ACTIVE;
    }

    @PreUpdate
    protected  void onUpdate(){
        updatedAt=LocalDateTime.now();
    }
}
