package com.policy.service.service.impl;

import java.util.List;
import com.policy.service.exceptions.ResourceAlreadyExistsException;
import com.policy.service.exceptions.ResourceNotFoundException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.policy.service.dto.request.ClaimRequest;
import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.repository.ClaimRepository;
import com.policy.service.repository.ContractRepository;
import com.policy.service.service.ClaimService;
import com.policy.service.entity.Claim;
import com.policy.service.mapper.ClaimMapper;

@Service
public class ClaimServiceImpl implements ClaimService {

    @Autowired ClaimRepository repository;
    @Autowired ClaimMapper mapper;
    @Autowired ContractRepository contractRepository;

    public ClaimResponse addClaim(ClaimRequest claim){
        if (!contractRepository.existsById(claim.getContractId())) {
            throw new ResourceNotFoundException("You are mentioning a Contract that does not exist.");
        }
        if (!repository.existsByDateAndDescriptionAndClaimedAmount(claim.getDate(), claim.getDescription(), claim.getClaimedAmount())) {
            Claim claimToSave = mapper.claimRequestToClaim(claim);
            return mapper.map(repository.save(claimToSave));
        } else throw new ResourceAlreadyExistsException("Claim already exists.");
    }

    public List<ClaimResponse> getClaims(){
        return mapper.map(repository.findAll());
    }

    public List<ClaimResponse> getContractClaims(Long contractId){
        if (contractId.equals(null)) {
            return null;
        }
        return mapper.map(repository.findAllByContractId(contractId));
    }

    public ResponseEntity<String> deleteClaim(Long id){
        if (repository.existsById(id)) {
            repository.deleteById(id);
            return new ResponseEntity<String>("Claim deleted.", HttpStatus.OK);
        } else return new ResponseEntity<String>("Error deleting claim.", HttpStatus.BAD_REQUEST);
    }

}
