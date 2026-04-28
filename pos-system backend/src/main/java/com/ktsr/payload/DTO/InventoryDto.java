package com.ktsr.payload.DTO;

import com.ktsr.entity.Branch;
import com.ktsr.entity.Product;
import jakarta.persistence.Column;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class InventoryDto {

    private Long id;

    private BranchDto branch;

    private  Long branchId;

    private Long productId;

    private ProductDto product;


    private Integer quantity;

    private LocalDateTime lastUpdate;
}
