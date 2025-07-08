package com.example.inertia_demo.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import io.github.inertia4j.spring.Inertia;

@RestController
public class HomeController {
    @Autowired
    private Inertia inertia;

    @GetMapping("/")
    public ResponseEntity<String> index(){
        return inertia.render("Home");
    }
}
