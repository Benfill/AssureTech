package com.policy.service.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.policy.service.entity.Claim;


@Repository
public interface ClaimRepository extends JpaRepository<Claim, Long> {
    boolean existsByDateAndDescriptionAndClaimedAmount(LocalDate date, String description, Double claimedAmount);
    // Double reimbursedAmount;
    // Long contractId;
    List<Claim> findAllByContractId(Long contractId);
}
