package com.policy.service.configs;


import org.springframework.context.annotation.Bean;

import com.policy.service.feign.CustomerErrorDecoder;

import feign.codec.ErrorDecoder;
import feign.okhttp.OkHttpClient;

public class ClientConfiguration {
    @Bean
    public OkHttpClient client() {
        return new OkHttpClient();
    }

    @Bean
    public ErrorDecoder errorDecoder() {
        return new CustomerErrorDecoder();
    }
}
