package com.auth.service.dto;

import java.util.List;

import javax.validation.constraints.NotNull;

import com.auth.service.entity.enums.ERole;

import lombok.Data;

@Data
public class RolesDto {
    @NotNull(message = "Email should not be null")
    List<ERole> roles;
}
