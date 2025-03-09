package com.policy.service.feign;

import com.policy.service.dto.response.CustomerResponse;
import org.springframework.cloud.openfeign.*;
import org.springframework.web.bind.annotation.*;
import com.policy.service.configs.ClientConfiguration;

@FeignClient(name = "customers", 
             url = "http://localhost:8080/api/customers/", 
             configuration = ClientConfiguration.class, 
             fallback = CustomerFallback.class)
public interface CustomerClient {
    @RequestMapping(method = RequestMethod.GET, value = "{customerId}", produces = "application/json")
    CustomerResponse getCustomerById(@PathVariable Long customerId);

    // @RequestMapping(method = RequestMethod.GET, value = "/stores")
    // Page<Store> getStores(Pageable pageable);

    // @RequestMapping(method = RequestMethod.POST, value = "/customers/{storeId}", consumes = "application/json")
    // Store update(@PathVariable("storeId") Long storeId, Store store);

    // @RequestMapping(method = RequestMethod.DELETE, value = "/stores/{storeId:\\d+}")
    // void delete(@PathVariable Long storeId);
}


