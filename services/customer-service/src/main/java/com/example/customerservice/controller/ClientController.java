package com.example.customerservice.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.customerservice.dto.ClientRequest;
import com.example.customerservice.dto.ClientResponse;
import com.example.customerservice.service.ClientService;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@RestController
@RequestMapping("/api")
public class ClientController {
    private final ClientService clientService;

    @GetMapping("/user/customers")
    public ResponseEntity<List<ClientResponse>> getAllClients() {
	return ResponseEntity.ok(clientService.getAllClients());
    }

    @GetMapping("/public/customers/{id}")
    public ResponseEntity<ClientResponse> getClientById(@PathVariable String id) {
	return ResponseEntity.ok(clientService.getClientById(id));
    }

    @PostMapping("/user/customers")
    public ResponseEntity<ClientResponse> createClient(@RequestBody ClientRequest clientRequest) {
	return ResponseEntity.ok(clientService.register(clientRequest));
    }
}
