package com.policy.service.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class Claim {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private LocalDate date;
    private String description;
    private Double claimedAmount;
    private Double reimbursedAmount;
    private Long contractId;
}
