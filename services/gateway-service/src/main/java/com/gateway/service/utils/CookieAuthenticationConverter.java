package com.gateway.service.utils;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.server.resource.BearerTokenAuthenticationToken;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.web.server.ServerWebExchange;

import reactor.core.publisher.Mono;

public class CookieAuthenticationConverter implements ServerAuthenticationConverter {

    @Override
    public Mono<Authentication> convert(ServerWebExchange exchange) {
	return Mono.justOrEmpty(exchange.getRequest().getCookies().getFirst("Authorization"))
		.map(cookie -> new BearerTokenAuthenticationToken(cookie.getValue()));
    }
}
