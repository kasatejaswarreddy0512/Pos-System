package com.ktsr.payload.response;

import com.ktsr.payload.DTO.UserDto;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;
    private String message;
    private UserDto user;

}
