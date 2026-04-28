package com.ktsr.entity;

import com.ktsr.domain.UserRole;
import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false, unique = true)
    @Email(message = "Email  should be valid")
    private String email;

    @Column(nullable = false)
    private String password;

    private String phone;


    @ManyToOne
    private Store store;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private UserRole role;

    @ManyToOne
    private Branch branch;


    private LocalDateTime createdAt;
    private LocalDateTime updateAt;
    private LocalDateTime lastLoginAt;

}
