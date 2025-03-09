package com.policy.service.dto.request;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class ClaimRequest {
    @NotNull(message = "Date is required.")
    @JsonFormat(pattern = "dd/MM/yyyy")
    private LocalDate date;

    @NotNull(message = "Description is required.")
    private String description;

    @NotNull(message = "Claimed Amount is required.")
    private Double claimedAmount;

    @NotNull(message = "Reimbursed Amount is required.")
    private Double reimbursedAmount;

    @NotNull(message = "Contract Id is required.")
    private Long contractId;
}
