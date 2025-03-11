package com.policy.service.service.impl;

import com.policy.service.service.ContractService;
import com.policy.service.exceptions.ResourceNotFoundException;
// import com.policy.service.feign.CustomerClient;
import com.policy.service.helpers.ContractHelper;
import com.policy.service.exceptions.GeneralException;
import com.policy.service.exceptions.ResourceAlreadyExistsException;
import java.util.List;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.policy.service.dto.request.ContractRequest;
import com.policy.service.dto.response.ContractResponse;
import com.policy.service.dto.response.CustomerResponse;
import com.policy.service.repository.ContractRepository;
import com.policy.service.entity.Contract;
import com.policy.service.mapper.ContractMapper;
// import org.slf4j.Logger;
// import org.slf4j.LoggerFactory;

@Service
public class ContractServiceImpl implements ContractService {

    // final private Logger logger = LoggerFactory.getLogger(ContractHelper.class);

    @Autowired ContractRepository repository;
    @Autowired ContractMapper mapper;
    @Autowired private ContractHelper helper;
    // @Autowired private CustomerClient customerClient;

    public ContractResponse addContract(ContractRequest contract){
        if (!repository.existsByTypeAndClientId(contract.getType(), contract.getClientId())) {
            // CustomerResponse customerResponse = customerClient.getCustomerById(contract.getClientId());
            CustomerResponse customerResponse = CustomerResponse.builder().build(); 
            // logger.info("FETCHING CUSTOMER..., {}", customerResponse.toString());
            if (customerResponse != null) {
                Contract contractToSave = mapper.contractRequestToContract(contract);
                return mapper.map(repository.save(contractToSave), helper);
            } else throw new ResourceNotFoundException("Customer with this ID was not found.");
        } else throw new ResourceAlreadyExistsException("Contract already exists.");
    }

    public ContractResponse getContractById(Long id){
        Optional<Contract> foundContract = repository.findById(id);
        if (foundContract.isPresent()) {
            return mapper.map(foundContract.get(), helper);
        } else throw new ResourceNotFoundException("No Contract was Found.");
    }

    public List<ContractResponse> getClientContracts(Long clientId){
        return mapper.map(repository.findAllByClientId(clientId), helper);
    }

    public List<ContractResponse> getContracts(){
        return mapper.map(repository.findAll(), helper);
    }
    public ResponseEntity<String> deleteContract(Long id){
        if (this.repository.existsById(id)) {
            if (helper.deleteContractClaims(id)) {
                repository.deleteById(id);
                return new ResponseEntity<String>("Contract deleted.", HttpStatus.OK);
            } else throw new GeneralException("Failed deleting contract claims."); 

        } else throw new ResourceNotFoundException("No Contract was Found."); 
    }

    
}
