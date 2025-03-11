package com.auth.service.service;

import java.util.List;

import com.auth.service.dto.GlobalResp;
import com.auth.service.dto.Request;
import com.auth.service.dto.Response;
import com.auth.service.dto.RolesDto;
import com.auth.service.entity.Role;
import com.auth.service.entity.User;

public interface IUserService {

    User getById(Long id);

    List<Response> getAll(Integer page, Integer size);

    Response update(Long id, Request dto);

    GlobalResp delete(Long id);

    GlobalResp assignRoles(Long id, RolesDto roles);

    Response getDetails(Long id);

    List<Role> getAllRoles();
}
