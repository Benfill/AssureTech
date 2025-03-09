package com.auth.service.config;

import java.util.Arrays;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.auth.service.security.jwt.JwtAuthenticationFilter;
import com.auth.service.security.service.UserDetailsServiceImpl;

@EnableWebSecurity
@Configuration
public class SecurityConfig {

    @Value("${cors.config.allowed.origin}")
    private String ALLOWED_ORIGIN;

    @Autowired
    UserDetailsServiceImpl userDetailsService;

    @Autowired
    private JwtAuthenticationFilter filter;

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
	http.csrf().disable().httpBasic().and()
		.authorizeRequests().antMatchers("/api/auth/**").permitAll().antMatchers("/images/**").permitAll()
		.antMatchers("/api/user/**").hasAnyRole("ADMIN", "USER").antMatchers("/api/admin/**").hasRole("ADMIN")
		.anyRequest().authenticated().and().sessionManagement()
		.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().exceptionHandling()
		.authenticationEntryPoint((request, response, authException) -> response
			.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Unauthorized"))
		.and().logout().logoutUrl("/api/auth/logout")
		.logoutSuccessHandler((request, response, authentication) -> {
		    response.setStatus(HttpServletResponse.SC_OK);
		}).deleteCookies("Authorization").clearAuthentication(true).invalidateHttpSession(true).and()
		.addFilterBefore(filter, UsernamePasswordAuthenticationFilter.class);

	return http.build();
    }

    // Disable security
    @Profile("dev")
    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
	return (web) -> web.ignoring().requestMatchers(new AntPathRequestMatcher("/**"));
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
	return new BCryptPasswordEncoder(12);
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
	DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();

	authProvider.setUserDetailsService(userDetailsService);
	authProvider.setPasswordEncoder(passwordEncoder());

	return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	return authConfig.getAuthenticationManager();
    }

}
