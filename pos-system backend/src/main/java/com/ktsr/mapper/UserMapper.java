package com.ktsr.mapper;

import com.ktsr.entity.User;
import com.ktsr.payload.DTO.UserDto;

import java.time.LocalDateTime;

public class UserMapper {

    public static UserDto toDto(User savedUser) {
        UserDto userDto= new UserDto();
        userDto.setId(savedUser.getId());
        userDto.setEmail(savedUser.getEmail());
        userDto.setPassword(savedUser.getPassword());
        userDto.setFullName(savedUser.getFullName());
        userDto.setPhone(savedUser.getPhone());
        userDto.setRole(savedUser.getRole());
        userDto.setCreatedAt(savedUser.getCreatedAt());
        userDto.setUpdateAt(savedUser.getUpdateAt());
        userDto.setLastLoginAt(savedUser.getLastLoginAt());
        userDto.setBranchId(savedUser.getBranch()!= null? savedUser.getBranch().getId(): null);
        userDto.setStoreId(savedUser.getStore()!=null ? savedUser.getStore().getId():null);

        return userDto;
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
