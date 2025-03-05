package com.gateway.service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;

import com.gateway.service.utils.CookieAuthenticationConverter;
import com.gateway.service.utils.JwtReactiveAuthenticationManager;
import com.gateway.service.utils.JwtValidator;

@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http,
	    ServerAuthenticationConverter cookieAuthenticationConverter, JwtValidator jwtValidator) {
	// Create an AuthenticationWebFilter to handle JWT authentication
	AuthenticationWebFilter authenticationWebFilter = new AuthenticationWebFilter(
		new JwtReactiveAuthenticationManager(jwtValidator));
	authenticationWebFilter.setServerAuthenticationConverter(cookieAuthenticationConverter);

	http.authorizeExchange(exchanges -> exchanges.pathMatchers("/public/**").permitAll() // Public endpoints
		.anyExchange().authenticated() // Secure all other endpoints
	).addFilterAt(authenticationWebFilter, SecurityWebFiltersOrder.AUTHENTICATION)
		.csrf(ServerHttpSecurity.CsrfSpec::disable); // Disable CSRF for stateless APIs

	return http.build();
    }

    @Bean
    public ServerAuthenticationConverter cookieAuthenticationConverter() {
	return new CookieAuthenticationConverter();
    }
}