package com.ktsr.controller;

import com.ktsr.exceptions.UserException;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.payload.response.AuthResponse;
import com.ktsr.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;

    @PostMapping("/signup")
    public ResponseEntity<AuthResponse> signup(@RequestBody UserDto userDto) throws UserException {
        AuthResponse authResponse= authService.signup(userDto);
        return new ResponseEntity<>(authResponse, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody UserDto userDto) throws UserException {
        AuthResponse authResponse=authService.login(userDto);
        return ResponseEntity.ok(authResponse);
    }
}
