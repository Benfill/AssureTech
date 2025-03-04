package com.example.customerservice.service;

import com.example.customerservice.dto.ClientRequest;
import com.example.customerservice.dto.ClientResponse;

import java.util.List;
import java.util.Optional;

public interface ClientService {
    ClientResponse register(ClientRequest clientRequest);
    List<ClientResponse> getAllClients();
    ClientResponse getClientById(String id);
}
