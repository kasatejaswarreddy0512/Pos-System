package com.ktsr.service;

import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.payload.response.AuthResponse;

public interface AuthService {

    AuthResponse signup(UserDto userDto) throws UserException;

    AuthResponse login(UserDto userDto) throws UserException;

}
