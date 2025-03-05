package com.gateway.service;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class Controller {

    @GetMapping("/public")
    String test1() {
	return "Public is working";
    }

    @GetMapping("/private")
    String test2() {
	return "Private is working";
    }
}
