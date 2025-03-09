package com.policy.service.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.dto.request.ClaimRequest;
import com.policy.service.service.ClaimService;

import jakarta.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/api/claims")
public class ClaimController {
    @Autowired ClaimService claimService;

    @PostMapping
    public ClaimResponse addClaim(@RequestBody @Valid ClaimRequest claim) {
        return claimService.addClaim(claim);
    }

    @GetMapping
    public List<ClaimResponse> getClaims() {
        return claimService.getClaims();
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteClaim(@PathVariable Long id) {
        return claimService.deleteClaim(id);
    }
}
