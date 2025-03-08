package com.gateway.service.config;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.util.pattern.PathPatternParser;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;

import com.gateway.service.exception.InvalidTokenException;
import com.gateway.service.exception.TokenExpiredException;
import com.gateway.service.utils.JwtAuthenticationConverter;
import com.gateway.service.utils.JwtValidator;

import reactor.core.publisher.Mono;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Autowired
    private JwtValidator jwtValidator;

	@Value("${cors.config.allowed.origin}")
    private String ALLOWED_ORIGIN;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
	// Create authentication manager and converter
	ReactiveAuthenticationManager authenticationManager = new JwtReactiveAuthenticationManager(jwtValidator);
	ServerAuthenticationConverter authenticationConverter = new JwtAuthenticationConverter();

	// Create authentication web filter
	AuthenticationWebFilter authenticationWebFilter = new AuthenticationWebFilter(authenticationManager);
	authenticationWebFilter.setServerAuthenticationConverter(authenticationConverter);

	http.authorizeExchange(
		exchanges -> exchanges.pathMatchers("/api/public/**").permitAll().pathMatchers("/api/auth/**")
			.permitAll().pathMatchers("/api/user/**").authenticated().anyExchange().denyAll())
		.addFilterAt(authenticationWebFilter, SecurityWebFiltersOrder.AUTHENTICATION) // Apply filter only to
											      // authenticated endpoints
		.exceptionHandling(exceptionHandling -> exceptionHandling.authenticationEntryPoint((exchange, ex) -> {
		    if (ex instanceof TokenExpiredException) {
			return handleTokenExpiredException(exchange, ex);
		    } else if (ex instanceof InvalidTokenException) {
			return handleInvalidTokenException(exchange, ex);
		    } else {
			return handleGenericException(exchange, ex);
		    }
		})).csrf(ServerHttpSecurity.CsrfSpec::disable);

	return http.build();
    }

	@Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        
        config.setAllowedOrigins(Arrays.asList(ALLOWED_ORIGIN));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "X-Requested-With", "Accept",
            "Origin", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
        config.setExposedHeaders(Arrays.asList("Access-Control-Allow-Origin", "Access-Control-Allow-Credentials"));
        config.setAllowCredentials(true);
        config.setMaxAge(3600L);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource(new PathPatternParser());
        source.registerCorsConfiguration("/api/**", config);

        return new CorsWebFilter(source);
    }

    private Mono<Void> handleTokenExpiredException(ServerWebExchange exchange, Throwable ex) {
	exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
	String responseBody = "{\"error\": \"Token has expired\", \"message\": \"" + ex.getMessage() + "\"}";
	return exchange.getResponse()
		.writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody.getBytes())));
    }

    private Mono<Void> handleInvalidTokenException(ServerWebExchange exchange, Throwable ex) {
	exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
	exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
	String responseBody = "{\"error\": \"Invalid token\", \"message\": \"" + ex.getMessage() + "\"}";
	return exchange.getResponse()
		.writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody.getBytes())));
    }

    private Mono<Void> handleGenericException(ServerWebExchange exchange, Throwable ex) {
	exchange.getResponse().setStatusCode(HttpStatus.INTERNAL_SERVER_ERROR);
	exchange.getResponse().getHeaders().setContentType(MediaType.APPLICATION_JSON);
	String responseBody = "{\"error\": \"Internal Server Error\", \"message\": \"" + ex.getMessage() + "\"}";
	return exchange.getResponse()
		.writeWith(Mono.just(exchange.getResponse().bufferFactory().wrap(responseBody.getBytes())));
    }
}