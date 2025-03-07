package com.example.customerservice.dto;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import com.example.customerservice.entity.Role;
import lombok.*;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    private Long id;
    private String firstName;
    private String lastName;
    private String phone;
    private String email;
    private List<Role> roles = new ArrayList<>();
    private Boolean enable;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}