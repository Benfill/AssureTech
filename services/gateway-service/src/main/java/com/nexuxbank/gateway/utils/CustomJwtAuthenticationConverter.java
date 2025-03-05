package com.nexuxbank.gateway.utils;

import java.util.Collection;
import java.util.Collections;
import java.util.stream.Collectors;

import org.springframework.core.convert.converter.Converter;
import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationToken;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.stereotype.Component;

import reactor.core.publisher.Mono;

@Component
public class CustomJwtAuthenticationConverter implements Converter<Jwt, Mono<AbstractAuthenticationToken>> {

    private final JwtGrantedAuthoritiesConverter jwtGrantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();

    @Override
    public Mono<AbstractAuthenticationToken> convert(Jwt jwt) {
	Collection<GrantedAuthority> authorities = jwtGrantedAuthoritiesConverter.convert(jwt);
	if (authorities == null) {
	    authorities = Collections.emptyList();
	}

	// Extract custom claims or roles from the JWT
	Collection<GrantedAuthority> customAuthorities = jwt.getClaimAsStringList("roles").stream()
		.map(role -> new SimpleGrantedAuthority("ROLE_" + role)).collect(Collectors.toList());

	authorities.addAll(customAuthorities);

	return Mono.just(new JwtAuthenticationToken(jwt, authorities));
    }
}
