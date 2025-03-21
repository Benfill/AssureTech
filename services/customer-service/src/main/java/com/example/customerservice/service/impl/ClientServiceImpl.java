package com.example.customerservice.service.impl;

import com.example.customerservice.config.UserClient;
import com.example.customerservice.dto.ClientRequest;
import com.example.customerservice.dto.ClientResponse;
import com.example.customerservice.entity.Client;
import com.example.customerservice.repository.ClientRepository;
import com.example.customerservice.service.ClientService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class ClientServiceImpl implements ClientService {
    private final ClientRepository clientRepository;
    private final UserClient userClient;

    @Override
    public ClientResponse register(ClientRequest clientRequest) {
        if (clientRepository.existsByEmail(clientRequest.getEmail())) {
            throw new RuntimeException("Client already exists");
        }

        if (userClient.getUserById(clientRequest.getUserId()) == null) {
            throw new RuntimeException("User not found");
        }

        Client newClient = buildClient(clientRequest);
        return buildClientResponse(clientRepository.save(newClient));
    }

    @Override
    public List<ClientResponse> getAllClients() {
        return clientRepository.findAll().stream()
                .map(this::buildClientResponse)
                .toList();
    }

    @Override
    public ClientResponse getClientById(String id) {
        return clientRepository.findById(id)
                .map(this::buildClientResponse)
                .orElseThrow(() -> new RuntimeException("Client not found"));
    }

    private Client buildClient(ClientRequest clientRequest) {
        return Client.builder()
                .id(clientRequest.getId())
                .firstName(clientRequest.getFirstName())
                .lastName(clientRequest.getLastName())
                .address(clientRequest.getAddress())
                .email(clientRequest.getEmail())
                .phone(clientRequest.getPhone())
                .userId(clientRequest.getUserId())
                .build();
    }

    private ClientResponse buildClientResponse(Client client) {
        return ClientResponse.builder()
                .id(client.getId())
                .firstName(client.getFirstName())
                .lastName(client.getLastName())
                .address(client.getAddress())
                .email(client.getEmail())
                .phone(client.getPhone())
                .userId(client.getUserId())
                .build();
    }
}
