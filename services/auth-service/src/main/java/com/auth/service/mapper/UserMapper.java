package com.auth.service.mapper;

import java.util.List;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.auth.service.dto.RegisterDto;
import com.auth.service.dto.Request;
import com.auth.service.dto.Response;
import com.auth.service.entity.User;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "id", source = "entity.id")
    @Mapping(target = "createdAt", source = "entity.createdAt")
    @Mapping(target = "updatedAt", source = "entity.updatedAt")
    Response entityToDto(User entity);

    User dtoToEntity(Request dto);

    User dtoToEntity(RegisterDto dto);

    List<Response> entitiesToDto(List<User> users);
}
