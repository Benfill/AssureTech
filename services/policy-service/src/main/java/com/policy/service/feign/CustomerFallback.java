package  com.policy.service.feign;

import org.springframework.stereotype.Component;

import com.policy.service.dto.response.CustomerResponse;

@Component
public class CustomerFallback implements CustomerClient {
    @Override
    public CustomerResponse getCustomerById(Long customerId) {
        return null;
    }
}
