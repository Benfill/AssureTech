package com.policy.service.dto.request;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.policy.service.entity.enums.ContractType;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ContractRequest {
    @NotNull(message = "Type is required (must be one of: CAR, HOME, HEALTH).")
    private ContractType type;

    @NotNull(message = "Effective Date is required.")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate effectiveDate;

    @NotNull(message = "Expiration Date is required.")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate expirationDate;

    @NotNull(message = "Coverage Amount is required.")
    private Double coverageAmount;

    @NotNull(message = "Client Id is required.")
    private Long clientId;
}
