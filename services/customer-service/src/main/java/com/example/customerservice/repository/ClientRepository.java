package com.example.customerservice.repository;

import com.example.customerservice.entity.Client;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ClientRepository extends JpaRepository<Client, String> {
    Boolean existsByEmail(String email);
}
