package com.ktsr.service.impl;

import com.ktsr.config.JwtProvider;
import com.ktsr.domain.UserRole;
import com.ktsr.entity.User;
import com.ktsr.exceptions.UserException;
import com.ktsr.mapper.UserMapper;
import com.ktsr.payload.DTO.UserDto;
import com.ktsr.payload.response.AuthResponse;
import com.ktsr.repository.UserRepository;
import com.ktsr.service.AuthService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collection;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private  final JwtProvider jwtProvider;
    private final CustomUserServiceImpl customUserService;

    @Override
    public AuthResponse signup(UserDto userDto) throws UserException {
        User user= userRepository.findByEmail(userDto.getEmail());
        if(user!=null){
            throw  new UserException("Email id already registered...!");
        }
        if(userDto.getRole().equals(UserRole.ROLE_ADMIN)){
            throw new UserException("Role admin is not allowed...!");
        }

        User newUser= new User();
        newUser.setEmail(userDto.getEmail());
        newUser.setPassword(passwordEncoder.encode(userDto.getPassword()));
        newUser.setFullName(userDto.getFullName());
        newUser.setPhone(userDto.getPhone());
        newUser.setRole(userDto.getRole());
        newUser.setLastLoginAt(LocalDateTime.now());
        newUser.setCreatedAt(LocalDateTime.now());
         User savedUser=userRepository.save(newUser);

        Authentication authentication= new UsernamePasswordAuthenticationToken(
                userDto.getEmail(), userDto.getPassword());

        SecurityContextHolder.getContext().setAuthentication(authentication);

        String jwt=jwtProvider.generateToken(authentication);

        AuthResponse authResponse= new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Registered Successfully....!");
        authResponse.setUser(UserMapper.toDto(savedUser));

        return authResponse;
    }

    @Override
    public AuthResponse login(UserDto userDto) throws UserException {
        String email=userDto.getEmail();
        String password= userDto.getPassword();
        Authentication authentication= authenticate(email,password);

        SecurityContextHolder.getContext().setAuthentication(authentication);

        Collection<? extends GrantedAuthority> authorities= authentication.getAuthorities();

        String role=authorities.iterator().next().getAuthority();
        String jwt=jwtProvider.generateToken(authentication);

        User user= userRepository.findByEmail(email);
        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

        AuthResponse authResponse= new AuthResponse();
        authResponse.setJwt(jwt);
        authResponse.setMessage("Login Successfully....!");
        authResponse.setUser(UserMapper.toDto(user));

        return authResponse;
    }

    private Authentication authenticate(String email, String password) throws UserException {

        UserDetails userDetails= customUserService.loadUserByUsername(email);
        if(userDetails==null){
            throw  new UserException("Email id doesn't exists..!" + email);
        }

        if(!passwordEncoder.matches(password,userDetails.getPassword())){
            throw new UserException("Password doesn't match...!");
        }

        return  new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
    }
}
