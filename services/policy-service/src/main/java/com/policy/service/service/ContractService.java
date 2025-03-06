package com.policy.service.service;

import java.util.List;
import com.policy.service.dto.request.ContractRequest;
import com.policy.service.dto.response.ContractResponse;
import org.springframework.http.ResponseEntity;

public interface ContractService {
    ContractResponse addContract(ContractRequest contract);
    ContractResponse getContractById(Long id);
    List<ContractResponse> getClientContracts(Long clientId);

    // not mentioned but there you go.
    List<ContractResponse> getContracts();
    ResponseEntity<String> deleteContract(Long id);
}

