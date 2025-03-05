package com.auth.service.entity.enums;

public enum ERole {
    ROLE_ADMIN, ROLE_USER;

    // Helper method to get the role name
    public String getRoleName() {
	return this.name();
    }
}
