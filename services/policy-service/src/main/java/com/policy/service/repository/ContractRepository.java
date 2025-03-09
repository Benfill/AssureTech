package com.policy.service.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.policy.service.entity.Contract;
import com.policy.service.entity.enums.ContractType;
import java.util.List;


@Repository
public interface ContractRepository extends JpaRepository<Contract, Long> {
    boolean existsByTypeAndClientId(ContractType type, Long clientId);
    List<Contract> findAllByClientId(Long clientId);
}
