package com.example.inertia_demo.controllers;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Map;
import java.security.Principal;
import io.github.inertia4j.spring.Inertia;

@RestController
public class HomeController extends BaseController {

    public HomeController(Inertia inertia) {
        super(inertia);
    }
  
    @GetMapping("/")
    public ResponseEntity<String> index(Principal principal){
        return render("Home", Map.of("title", "Home Page"), principal);
    }
}
