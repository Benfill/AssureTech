package com.policy.service.entity;

import com.policy.service.entity.enums.ContractType;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDate;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
@Entity
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private ContractType type;
    private LocalDate effectiveDate;
    private LocalDate expirationDate;
    private Double coverageAmount;
    private Long clientId;
}
