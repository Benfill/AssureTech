package com.policy.service.dto.response;

import com.policy.service.entity.enums.ContractType;
import lombok.*;
import java.util.List;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ContractResponse {
    private Long id;

    private ContractType type;
    private LocalDate effectiveDate;
    private LocalDate expirationDate;
    private Double coverageAmount;
    private Long clientId;

    private List<ClaimResponse> claims;
}
