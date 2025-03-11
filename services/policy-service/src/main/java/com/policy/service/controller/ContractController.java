package com.policy.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.policy.service.service.ContractService;
import org.springframework.http.ResponseEntity; 

import com.policy.service.dto.response.ContractResponse;
import com.policy.service.dto.request.ContractRequest;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/contracts")
public class ContractController {
    @Autowired ContractService contractService;

    @PostMapping
    public ContractResponse addContract(@RequestBody @Valid ContractRequest contract) {
        return contractService.addContract(contract);
    }

    @GetMapping("/{id}")
    public ContractResponse getContractById(@PathVariable Long id) {
        return contractService.getContractById(id);
    }

    @GetMapping("/client/{clientId}")
    public List<ContractResponse> getClientContracts(@PathVariable Long clientId) {
        return contractService.getClientContracts(clientId);
    }


    // not mentioned in B, but may be used.
    @GetMapping
    public List<ContractResponse> getContracts() {
        return contractService.getContracts();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContract(@PathVariable Long id) {
        return contractService.deleteContract(id);
    }
}
