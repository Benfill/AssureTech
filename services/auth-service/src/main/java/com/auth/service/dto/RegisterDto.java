package com.auth.service.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterDto {
    @NotNull(message = "First Name is required")
    private String firstName;

    private String lastName;

    private String phone;
    @NotNull(message = "email is required")
    private String email;

    @NotNull(message = "password is required")
    private String password;
}
