package com.policy.service.feign;

import com.policy.service.dto.response.CustomerResponse;
import java.util.List;
import org.springframework.cloud.openfeign.*;

@FeignClient(url = "mh:8080/api/customers")
public interface CustomerClient {
    @RequestMapping(method = RequestMethod.GET, value = "/{customerId}")
    CustomerResponse getCustomer(@PathVariable Long customerId);

    // @RequestMapping(method = RequestMethod.GET, value = "/stores")
    // Page<Store> getStores(Pageable pageable);

    // @RequestMapping(method = RequestMethod.POST, value = "/customers/{storeId}", consumes = "application/json")
    // Store update(@PathVariable("storeId") Long storeId, Store store);

    // @RequestMapping(method = RequestMethod.DELETE, value = "/stores/{storeId:\\d+}")
    // void delete(@PathVariable Long storeId);
}


