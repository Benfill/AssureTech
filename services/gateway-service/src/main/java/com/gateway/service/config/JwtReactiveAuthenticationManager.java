package com.gateway.service.config;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.gateway.service.utils.JwtValidator;

import io.jsonwebtoken.Claims;
import reactor.core.publisher.Mono;

public class JwtReactiveAuthenticationManager implements ReactiveAuthenticationManager {

    private final JwtValidator jwtValidator;

    public JwtReactiveAuthenticationManager(JwtValidator jwtValidator) {
	this.jwtValidator = jwtValidator;
    }

    @Override
    public Mono<Authentication> authenticate(Authentication authentication) {
	return Mono.justOrEmpty(authentication).filter(auth -> auth instanceof BearerTokenAuthenticationToken)
		.cast(BearerTokenAuthenticationToken.class).flatMap(token -> {
		    Claims claims = jwtValidator.validateToken(token.getToken());
		    List<SimpleGrantedAuthority> authorities = ((List<?>) claims.get("roles")).stream()
			    .map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toList());
		    return Mono.just(new PreAuthenticatedAuthenticationToken(claims.getSubject(), null, authorities));
		});
    }
}
