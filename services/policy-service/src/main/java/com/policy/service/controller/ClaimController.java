package com.policy.service.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.policy.service.dto.request.ClaimRequest;
import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.service.ClaimService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/user/claims")
public class ClaimController {
    @Autowired
    ClaimService claimService;

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
