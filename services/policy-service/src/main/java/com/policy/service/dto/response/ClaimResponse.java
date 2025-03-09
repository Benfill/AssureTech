package com.policy.service.dto.response;

import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ClaimResponse {
    private Long id;
    private LocalDate date;
    private String description;
    private Double claimedAmount;
    private Double reimbursedAmount;
    private Long contractId;
}
