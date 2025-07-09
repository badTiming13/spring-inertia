package com.example.inertia_demo.config;

import io.github.inertia4j.spring.Inertia;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.example.inertia_demo.services.DbUserDetailsService;
import org.springframework.core.Ordered;
import org.springframework.core.annotation.Order;
import org.springframework.web.filter.OncePerRequestFilter;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.stream.Collectors;

@Configuration
public class SecurityConfig {
        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public DaoAuthenticationProvider daoAuthProvider(DbUserDetailsService userDetailsService,
                        BCryptPasswordEncoder passwordEncoder) {
                // use the UserDetailsService constructor to avoid the deprecated no-arg
                // constructor
                DaoAuthenticationProvider provider = new DaoAuthenticationProvider(userDetailsService);
                provider.setPasswordEncoder(passwordEncoder);
                return provider;
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http,
                        DaoAuthenticationProvider daoAuth,
                        Inertia inertia) throws Exception {
                http
                                .authenticationProvider(daoAuth)
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers("/login", "/favicon.ico", "/css/**", "/js/**", "/test")
                                                .permitAll()
                                                .anyRequest().authenticated())
                                .formLogin(form -> form
                                                .loginPage("/login")
                                                .loginProcessingUrl("/login")
                                                .successHandler((req, res, authentication) -> {
                                                        // например, сразу редирект на главную
                                                        System.out.println("Login successful for user ");
                                                        res.sendRedirect("/");
                                                })
                                                .failureHandler((req, res, exception) -> {
                                                        // например, редирект обратно с ?error
                                                        System.out.println("Login failed for user: "
                                                                        + req.getParameter("username"));
                                                        req.getParameterMap()
                                                                        .forEach((key, values) -> System.out.println(
                                                                                        "  " + key + " = " + String
                                                                                                        .join(",", values)));
                                                        res.sendRedirect("/login?error");
                                                })
                                                .permitAll())
                                .logout(logout -> logout
                                                .logoutUrl("/logout")
                                                .logoutSuccessUrl("/login"))
                                .csrf(csrf -> csrf.disable());

                return http.build();
        }

        @Bean
        @Order(Ordered.HIGHEST_PRECEDENCE)
        public OncePerRequestFilter loginLoggingFilter() {
                return new OncePerRequestFilter() {
                        @Override
                        protected void doFilterInternal(
                                        HttpServletRequest request,
                                        HttpServletResponse response,
                                        FilterChain filterChain) throws ServletException, IOException {
                                if ("/login".equals(request.getRequestURI())
                                                && "POST".equalsIgnoreCase(request.getMethod())) {
                                        // read the entire body as a String
                                        String body = request.getReader()
                                                        .lines()
                                                        .collect(Collectors.joining("\n"));
                                        System.out.println("RAW /login body →\n" + body);
                                }
                                filterChain.doFilter(request, response);
                        }
                };
        }
}
