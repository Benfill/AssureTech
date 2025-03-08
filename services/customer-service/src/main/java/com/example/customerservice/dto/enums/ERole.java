package com.example.customerservice.dto.enums;

public enum ERole {
    ROLE_ADMIN, ROLE_USER;

    public String getRoleName() {
	return this.name();
    }
}
