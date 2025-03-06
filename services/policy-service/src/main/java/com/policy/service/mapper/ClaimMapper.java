package com.policy.service.mapper;

import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import com.policy.service.dto.request.ClaimRequest;
import com.policy.service.dto.response.ClaimResponse;
import com.policy.service.entity.Claim;

@Mapper(componentModel = "spring")
public interface ClaimMapper {
    List<ClaimResponse> map(List<Claim> claims);

    @Mapping(target = "id", ignore = true)
    Claim claimRequestToClaim(ClaimRequest claimRequest);


    default ClaimResponse map(Claim claim) {
        if (claim == null) return null;
        ClaimResponse claimResponse = ClaimResponse.builder()
                                                        .id(claim.getId())
                                                        .date(claim.getDate())
                                                        .description(claim.getDescription())
                                                        .claimedAmount(claim.getClaimedAmount())
                                                        .reimbursedAmount(claim.getReimbursedAmount())
                                                        .contractId(claim.getContractId())
                                                        .build();
        return claimResponse;
    }
}
