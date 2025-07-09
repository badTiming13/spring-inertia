package com.example.inertia_demo.controllers;

import io.github.inertia4j.spring.Inertia;
import org.springframework.http.ResponseEntity;

import java.security.Principal;
import java.util.HashMap;
import java.util.Map;

/**
 *
 * @author BDavydov
 */
public abstract class BaseController {

    protected final Inertia inertia;

    protected BaseController(Inertia inertia) {
        this.inertia = inertia;
    }

    protected ResponseEntity<String> render(String component, Map<String, Object> props, Principal principal) {
        var all = new HashMap<String, Object>();
        if (props != null) {
            all.putAll(props);
        }

        var auth = new HashMap<String, Object>();
        auth.put("user", principal != null ? principal.getName() : null);
        all.put("auth", auth);

        return inertia.render(component, all);
    }

}
