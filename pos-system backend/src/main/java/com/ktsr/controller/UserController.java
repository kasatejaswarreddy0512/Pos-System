package com.ktsr.controller;

import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.UserMapper;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;


    @GetMapping("/profile")
    public ResponseEntity<UserDto> getUserProfile(@RequestHeader("Authorization") String jwt) throws UserException {
        User user=userService.getUserFromJwtToken(jwt);
        return ResponseEntity.ok(UserMapper.toDto(user));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDto> getUserById(@PathVariable Long id,
                                               @RequestHeader("Authorization") String jwt) throws UserException {
        User user=userService.getUserById(id);
        return ResponseEntity.ok(UserMapper.toDto(user));
    }
}
