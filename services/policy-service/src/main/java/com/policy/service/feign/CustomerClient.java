package com.policy.service.feign;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.policy.service.configs.ClientConfiguration;
import com.policy.service.dto.response.CustomerResponse;

@FeignClient(name = "customers", url = "http://localhost:8080/api/public/customers/", configuration = ClientConfiguration.class, fallback = CustomerFallback.class)
public interface CustomerClient {
    @RequestMapping(method = RequestMethod.GET, value = "{customerId}", produces = "application/json")
    CustomerResponse getCustomerById(@PathVariable Long customerId);

    // @RequestMapping(method = RequestMethod.GET, value = "/stores")
    // Page<Store> getStores(Pageable pageable);

    // @RequestMapping(method = RequestMethod.POST, value = "/customers/{storeId}",
    // consumes = "application/json")
    // Store update(@PathVariable("storeId") Long storeId, Store store);

    // @RequestMapping(method = RequestMethod.DELETE, value =
    // "/stores/{storeId:\\d+}")
    // void delete(@PathVariable Long storeId);
}
