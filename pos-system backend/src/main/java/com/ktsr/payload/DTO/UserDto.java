package com.ktsr.payload.DTO;

import com.ktsr.domain.UserRole;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserDto {

    private Long id;
    private String fullName;
    private String email;
    private String password;
    private String phone;
    private UserRole role;
    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private LocalDateTime lastLoginAt;

    private Long storeId;
    private String storeName;

    private Long branchId;
    private String branchName;

}
