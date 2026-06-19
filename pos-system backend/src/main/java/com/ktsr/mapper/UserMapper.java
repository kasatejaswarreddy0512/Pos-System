package com.ktsr.mapper;

import com.ktsr.entity.User;
import com.ktsr.payload.DTO.UserDto;

import java.time.LocalDateTime;

public class UserMapper {

    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        return UserDto.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phone(user.getPhone())
                .role(user.getRole())
                .storeId(user.getStore() != null ? user.getStore().getId() : null)
                .storeName(user.getStore() != null ? user.getStore().getBrand() : null)
                .branchId(user.getBranch() != null ? user.getBranch().getId() : null)
                .branchName(user.getBranch() != null ? user.getBranch().getName() : null)
                .createdAt(user.getCreatedAt())
                .updateAt(user.getUpdateAt())
                .lastLoginAt(user.getLastLoginAt())
                .build();
    }

    public static  User toEntity(UserDto userDto){
        User user= new User();
        user.setEmail(userDto.getEmail());
        user.setPassword(userDto.getPassword());
        user.setFullName(userDto.getFullName());
        user.setRole(userDto.getRole());
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdateAt(LocalDateTime.now());
        user.setLastLoginAt(userDto.getLastLoginAt());
        user.setPhone(userDto.getPhone());

        return  user;

    }


}
