package com.example.inertia_demo.config;

import io.github.inertia4j.spring.Inertia;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import com.example.inertia_demo.service.DbUserDetailsService;

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
                        .requestMatchers("/login", "/favicon.ico", "/css/**", "/js/**").permitAll()
                        .anyRequest().authenticated())
                .formLogin(form -> form
                        .loginPage("/login")
                        .loginProcessingUrl("/login")
                        .defaultSuccessUrl("/", true)
                        .permitAll())
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/login"))
                .csrf(csrf -> csrf.disable());

        return http.build();
    }
}
