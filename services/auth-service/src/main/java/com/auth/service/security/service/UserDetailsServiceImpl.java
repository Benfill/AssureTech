package com.auth.service.security.service;

import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;

import com.auth.service.entity.User;
import com.auth.service.repository.UserRepository;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserRepository repository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
	User user = repository.findByEmail(email)
		.orElseThrow(() -> new UsernameNotFoundException("User Not Found with email: " + email));
	return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(),
		user.getRoles().stream().map(role -> new SimpleGrantedAuthority(role.getName().toString()))
			.collect(Collectors.toList()));
    }

}
