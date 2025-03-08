package com.example.customerservice.config;

import com.example.customerservice.dto.UserDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@FeignClient(name="UserClient", url="http://AUTH-SERVICE/api/")
public interface UserClient {

    @GetMapping("/users/{id}")
    UserDTO getUserById(@PathVariable String id);
}
