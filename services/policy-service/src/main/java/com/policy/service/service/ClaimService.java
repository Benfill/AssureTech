package com.policy.service.service;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.policy.service.dto.request.ClaimRequest;
import com.policy.service.dto.response.ClaimResponse;

public interface ClaimService {
    ClaimResponse addClaim(ClaimRequest claim);
    List<ClaimResponse> getClaims();
    List<ClaimResponse> getContractClaims(Long contractId);
    ResponseEntity<String> deleteClaim(Long id);
    
}
