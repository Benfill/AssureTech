package com.policy.service.mapper;

import java.util.List;

import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.policy.service.dto.request.ContractRequest;
import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.dto.response.ContractResponse;
import com.policy.service.entity.Contract;
import com.policy.service.helpers.ContractHelper;

@Mapper(componentModel = "spring")
public interface ContractMapper {    
    List<ContractResponse> map(List<Contract> contracts, @Context ContractHelper helper);

    @Mapping(target = "id", ignore = true)
    Contract contractRequestToContract(ContractRequest contractRequest);

    default ContractResponse map(Contract contract, @Context ContractHelper helper) {
        if (contract == null) return null;

        List<ClaimResponse> contractClaims = helper.getClaimsByContractId(contract.getId());

        ContractResponse contractResponse = ContractResponse.builder()
                                                        .id(contract.getId())
                                                        .type(contract.getType())
                                                        .effectiveDate(contract.getEffectiveDate())
                                                        .expirationDate(contract.getExpirationDate())
                                                        .coverageAmount(contract.getCoverageAmount())
                                                        .clientId(contract.getClientId())
                                                        .claims(contractClaims)
                                                        .build();
        return contractResponse;
    }
}
