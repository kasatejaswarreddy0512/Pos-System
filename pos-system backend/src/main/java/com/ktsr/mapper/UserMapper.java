package com.ktsr.mapper;

import com.ktsr.entity.User;
import com.ktsr.payload.DTO.UserDto;

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

        return userDto;
    }


}
