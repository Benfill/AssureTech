package com.auth.service.dto;

import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class LoginDto {

    @NotNull(message = "email is required")
    private String email;

    @NotNull(message = "password is required")
    private String password;
}
