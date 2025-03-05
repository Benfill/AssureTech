package com.auth.service.controller;

import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.auth.service.dto.GlobalResp;
import com.auth.service.dto.LoginDto;
import com.auth.service.dto.RegisterDto;
import com.auth.service.service.IAuthService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private IAuthService authService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody @Valid RegisterDto user) {
	return ResponseEntity.ok(authService.registerHandler(user));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody @Valid LoginDto body, HttpServletResponse resp) {
	return ResponseEntity.ok(authService.loginHandler(body, resp));
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse resp) {
	GlobalResp message = authService.logoutHandler(resp);
	return ResponseEntity.ok(message);
    }
}
