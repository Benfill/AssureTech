package com.auth.service.service;

import javax.servlet.http.HttpServletResponse;

import com.auth.service.dto.GlobalResp;
import com.auth.service.dto.LoginDto;
import com.auth.service.dto.RegisterDto;
import com.auth.service.dto.Response;

public interface IAuthService {

    Response registerHandler(RegisterDto user);

    Response loginHandler(LoginDto body, HttpServletResponse resp);

    GlobalResp logoutHandler(HttpServletResponse resp);

}
