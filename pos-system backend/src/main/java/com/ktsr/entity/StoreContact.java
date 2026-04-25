package com.ktsr.entity;

import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.Email;
import lombok.*;

@Data
@Embeddable
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StoreContact {

    private String address;
    private String phone;
    @Email(message = "Invalid email format")
    private String email;


}
