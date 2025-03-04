package com.example.customerservice.dto;

import jakarta.validation.constraints.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ClientRequest {
    private String id;

    @NotNull(message = "First name is required")
    @Size(min = 3, max = 50, message = "First name must be between 3 and 50 characters")
    private String firstName;

    @NotNull(message = "Last name is required")
    @Size(min = 3, max = 50, message = "Last name must be between 3 and 50 characters")
    private String lastName;

    @NotNull(message = "Email is required")
    @Email(message = "Email must be valid")
    private String email;

    private String password;

    @NotNull(message = "Address is required")
    private String address;

    @NotNull(message = "Phone is required")
    private String phone;
}
