package com.policy.service.helpers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;

import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.service.ClaimService;
import org.springframework.stereotype.Component;

@Component
public class ContractHelper {
    @Autowired ClaimService service;
    final private Logger logger = LoggerFactory.getLogger(ContractHelper.class);

    public List<ClaimResponse> getClaimsByContractId(Long contractId) {
        if (service != null) {
            logger.info(service.getContractClaims(contractId).toString());
            return service.getContractClaims(contractId);
        } else {
            logger.info("SERVICE IS NULL, {}", service);
            return null;
        }
    }

    public boolean deleteContractClaims(Long contractId){
        try {
            List<ClaimResponse> contractClaims = service.getContractClaims(contractId);
            for(ClaimResponse claim: contractClaims){
                service.deleteClaim(claim.getId());
            }
            return true;
        } catch (Exception e) {
            logger.error("ERROR DELETING CONTRACT CLAIMS, {}", e.getMessage());
            return false;
        }
    }
    
}
