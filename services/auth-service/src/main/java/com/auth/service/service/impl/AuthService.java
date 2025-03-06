package com.auth.service.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.auth.service.dto.GlobalResp;
import com.auth.service.dto.LoginDto;
import com.auth.service.dto.RegisterDto;
import com.auth.service.dto.Response;
import com.auth.service.entity.Role;
import com.auth.service.entity.User;
import com.auth.service.entity.enums.ERole;
import com.auth.service.exception.CustomDuplicateKeyException;
import com.auth.service.exception.ResourceNotFoundException;
import com.auth.service.mapper.UserMapper;
import com.auth.service.repository.RoleRepository;
import com.auth.service.repository.UserRepository;
import com.auth.service.security.jwt.TokenProvider;
import com.auth.service.service.IAuthService;

@Service
public class AuthService implements IAuthService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TokenProvider jwtUtil;
    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private UserMapper mapper;

    @Autowired
    private RoleRepository roleRepository;

    protected final Log logger = LogFactory.getLog(getClass());

    @Override
    public Response registerHandler(RegisterDto dto) {

	Optional<User> existingUser = userRepo.findByEmail(dto.getEmail());

	if (existingUser.isPresent()) {
	    throw new CustomDuplicateKeyException();
	}

	String encodedPass = encoder.encode(dto.getPassword());

	User user = mapper.dtoToEntity(dto);
	user.setPassword(encodedPass);

	// Add default USER role
	List<Role> roles = new ArrayList<Role>();
	Role userRole = roleRepository.findByName(ERole.ROLE_USER)
		.orElseThrow(() -> new RuntimeException("Default role not found"));
	roles.add(userRole);
	user.setRoles(roles);
	user.setEnable(true);

	user = userRepo.save(user);

	return mapper.entityToDto(user);
    }

    @Override
    public Response loginHandler(LoginDto body, HttpServletResponse resp) {
	Authentication authentication = authManager
		.authenticate(new UsernamePasswordAuthenticationToken(body.getEmail(), body.getPassword()));

	User savedUser = userRepo.findByEmail(body.getEmail())
		.orElseThrow(() -> new ResourceNotFoundException("User Not Found"));

	logger.warn("email: " + savedUser.getEmail() + "\npassword: " + savedUser.getPassword());

	if (!encoder.matches(body.getPassword(), savedUser.getPassword())) {
	    throw new RuntimeException("Password is wrong");
	}

	org.springframework.security.core.userdetails.User userDetails = new org.springframework.security.core.userdetails.User(
		savedUser.getEmail(), savedUser.getPassword(), savedUser.getRoles().stream()
			.map(role -> new SimpleGrantedAuthority(role.getName().name())).collect(Collectors.toList()));

	SecurityContextHolder.getContext().setAuthentication(authentication);
	String token = jwtUtil.generateToken(userDetails);

	Cookie jwtCookie = new Cookie("Authorization", token);

	jwtCookie.setHttpOnly(true);
	jwtCookie.setSecure(true);
	jwtCookie.setPath("/");
	jwtCookie.setMaxAge(7 * 24 * 60 * 60);

	resp.addCookie(jwtCookie);

	// Optionally, send some additional response if needed zs
	resp.setStatus(HttpServletResponse.SC_OK);
	resp.addCookie(jwtCookie);

	return mapper.entityToDto(savedUser);
    }

    @Override
    public GlobalResp logoutHandler(HttpServletResponse response) {
	try {
	    // Clear the JWT cookie
	    Cookie logoutCookie = new Cookie("Authorization", null);
	    logoutCookie.setMaxAge(0);
	    logoutCookie.setPath("/");
	    logoutCookie.setHttpOnly(true);
	    logoutCookie.setSecure(true);
	    logoutCookie.setDomain(null); // Clear domain if set

	    response.addCookie(logoutCookie);

	    // Clear any session-related attributes if they exist
	    SecurityContextHolder.clearContext();

	    return GlobalResp.builder().message("Successfully logged out").build();

	} catch (Exception e) {
	    return GlobalResp.builder().message("Could not process logout request").build();
	}
    }
}
