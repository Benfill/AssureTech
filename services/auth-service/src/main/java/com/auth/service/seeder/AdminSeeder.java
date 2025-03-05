package com.auth.service.seeder;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.auth.service.entity.Role;
import com.auth.service.entity.User;
import com.auth.service.repository.RoleRepository;
import com.auth.service.repository.UserRepository;

@Component
public class AdminSeeder {

    @Autowired
    private UserRepository repository;
    @Autowired
    private RoleRepository roleRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Transactional
    public void seed() {
	if (repository.count() == 0) {
	    // Fetch all roles
	    List<Role> roles = roleRepository.findAll();
	    System.out.println("Fetched roles: " + roles);

	    // Ensure roles are managed (attached to the persistence context)
	    roles = roleRepository.saveAll(roles);
	    System.out.println("Managed roles: " + roles);

	    String encodedPass = encoder.encode("password");

	    // Build the admin user
	    User admin = User.builder().firstName("Admin").email("admin@gmail.com").password(encodedPass)
		    .phone("2126000000000").enable(true).roles(roles) // Associate managed roles
		    .build();

	    // Save the admin user
	    repository.save(admin);
	    System.out.println("Admin seeded successfully!");
	}
    }
}
