package com.example.inertia_demo.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import io.github.inertia4j.spring.Inertia;
import java.security.Principal;
import org.springframework.http.ResponseEntity;
import java.util.Map;
import org.springframework.web.bind.annotation.RequestParam;
import java.util.HashMap;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;

@Controller
public class AuthController extends BaseController {

    public AuthController(Inertia inertia) {
        super(inertia);
    }

    @GetMapping("/login")
    public ResponseEntity<String> login(Principal principal, @RequestParam(name = "error", required = false) String error) {
        if (principal != null) {
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .header(HttpHeaders.LOCATION, "/")
                    .build();
        }
        Map<String, Object> props = new HashMap<>();
        if (error != null) {
            props.put("error", "Invalid username or password");
        }
        return render("Auth/Login", props, principal);
    }

    @PostMapping("/test")
    @ResponseBody
    public String test(@RequestBody String body) {
        System.out.println("body → " + body);
        return "got it";
    }

}
