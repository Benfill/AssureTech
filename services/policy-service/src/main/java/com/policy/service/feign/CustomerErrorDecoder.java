package com.policy.service.feign;

import feign.Response;
import feign.codec.ErrorDecoder;
import jakarta.ws.rs.BadRequestException;
import jakarta.ws.rs.NotFoundException;

public class CustomerErrorDecoder implements ErrorDecoder {
    @Override
    public Exception decode(String methodKey, Response response) {

        switch (response.status()){
            case 400:
                return new BadRequestException();
            case 404:
                return new NotFoundException();
            default:
                return new Exception("Generic error");
        }
    }
}
