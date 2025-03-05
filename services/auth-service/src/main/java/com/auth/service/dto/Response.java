package com.auth.service.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import com.auth.service.entity.Role;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Response {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private String password;
    private List<Role> roles = new ArrayList<>();
    private Boolean enable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
