package com.policy.service;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.cloud.openfeign.EnableFeignClients;

@SpringBootApplication(scanBasePackages={"com.policy.service"})
@EnableDiscoveryClient
@EnableFeignClients
public class PolicyServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(PolicyServiceApplication.class, args);
	}

}

