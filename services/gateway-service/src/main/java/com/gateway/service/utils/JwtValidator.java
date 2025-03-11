package com.gateway.service.utils;

import java.util.Date;
import java.util.List;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import com.gateway.service.exception.InvalidTokenException;
import com.gateway.service.exception.TokenExpiredException;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.security.SignatureException;

@Component
public class JwtValidator {

    @Value("${jwt.signing.key}")
    private String SECRET;

    @Value("${jwt.token.validity}")
    private long EXPIRATION;

    @Value("${jwt.clock.skew:300000}") // Default 5 minutes clock skew
    private long CLOCK_SKEW;

    private static final Logger logger = LoggerFactory.getLogger(JwtValidator.class);

    public Claims validateToken(String token) {
	try {
	    logger.info("Validating token: " + token);
	    Claims claims = Jwts.parserBuilder().setSigningKey(getSignInKey())
		    .setAllowedClockSkewSeconds(CLOCK_SKEW / 1000) // Convert milliseconds to seconds
		    .build().parseClaimsJws(token.trim()).getBody();
	    logger.info("Token validated successfully: " + claims);
	    return claims;
	} catch (ExpiredJwtException e) {
	    logger.debug("Token expired: " + e.getMessage());
	    throw new TokenExpiredException("Token has expired");
	} catch (SignatureException e) {
	    logger.debug("Invalid token signature: " + e.getMessage());
	    throw new InvalidTokenException("Invalid token signature");
	} catch (Exception e) {
	    logger.debug("Token validation failed: " + e.getMessage());
	    throw new InvalidTokenException("Invalid token: " + e.getMessage());
	}
    }

    public boolean isTokenExpired(String token) {
	try {
	    validateToken(token);
	    return false;
	} catch (TokenExpiredException | InvalidTokenException e) {
	    return true;
	}
    }

    private SecretKey getSignInKey() {
	byte[] keyBytes = Decoders.BASE64.decode(SECRET);
	return Keys.hmacShaKeyFor(keyBytes);
    }

    public String extractUsername(String token) {
	return extractClaims(token, Claims::getSubject);
    }

    public <T> T extractClaims(String token, Function<Claims, T> claimsResolver) {
	Claims claims = validateToken(token);
	return claimsResolver.apply(claims);
    }

    public List<String> extractRoles(String token) {
	List<String> roles = extractClaims(token, claims -> (List<String>) claims.get("roles"));
	logger.debug("Extracted roles from token: " + roles);
	return roles;
    }

    public Date extractExpiration(String token) {
	return extractClaims(token, Claims::getExpiration);
    }
}