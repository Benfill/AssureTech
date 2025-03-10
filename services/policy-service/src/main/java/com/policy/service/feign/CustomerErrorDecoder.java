package com.policy.service.feign;

import feign.Response;
import feign.codec.ErrorDecoder;
import com.policy.service.exceptions.ResourceNotFoundException;
import com.policy.service.exceptions.GeneralException;

public class CustomerErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {

        switch (response.status()){
            case 404:
                return new ResourceNotFoundException("Customer was not found.");
            default:
                return new GeneralException("Generic error");
        }
    }
}
