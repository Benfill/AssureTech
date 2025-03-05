package com.gateway.service.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsConfigurationSource;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.nexuxbank.gateway.utils.CustomJwtAuthenticationConverter;

@EnableWebFluxSecurity
public class SecurityConfig {
    @Value("${cors.config.allowed.origin}")
    private String ALLOWED_ORIGIN;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
	http.cors(cors -> cors.configurationSource(corsConfigurationSource())).authorizeExchange(exchanges -> exchanges
		.pathMatchers("/actuator/**", "/public/**").permitAll().anyExchange().authenticated() // Secure all
												      // other endpoints
	).oauth2ResourceServer(
		oauth2 -> oauth2.jwt(jwt -> jwt.jwtAuthenticationConverter(new CustomJwtAuthenticationConverter())))
		.csrf(ServerHttpSecurity.CsrfSpec::disable); // Disable CSRF for stateless APIs

	return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
	CorsConfiguration configuration = new CorsConfiguration();
	configuration.setAllowedOrigins(Arrays.asList("https://frontend-app.com")); // Allow your frontend origin
	configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
	configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type")); // Allow specific headers
	configuration.setAllowCredentials(true); // Allow credentials (e.g., cookies)

	UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	source.registerCorsConfiguration("/**", configuration); // Apply to all paths
	return source;
    }

}
