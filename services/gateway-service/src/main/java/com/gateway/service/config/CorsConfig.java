package com.gateway.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
	CorsConfiguration corsConfig = new CorsConfiguration();
	corsConfig.addAllowedOrigin("http://localhost:3000"); // Allow requests from this origin
	corsConfig.addAllowedMethod("*"); // Allow all HTTP methods
	corsConfig.addAllowedHeader("*"); // Allow all headers
	corsConfig.setAllowCredentials(true); // Allow credentials (e.g., cookies)
	corsConfig.setMaxAge(3600L); // Cache preflight response for 1 hour

	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/api/**", corsConfig); // Apply CORS to all paths under /api

	return new CorsWebFilter(source);
    }
}