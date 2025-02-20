package com.unnoba.allmusic_back.config;

import com.unnoba.allmusic_back.auth.filter.JwtAuthenticationFilter;
import com.unnoba.allmusic_back.auth.filter.JwtValidationFilter;
import com.unnoba.allmusic_back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.web.configurers.HeadersConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final String ARTIST = "MUSICARTIESUSER";
    private final String ENTHUSIAST = "MUSICENTHUSIASTUSER";

    @Autowired
    private AuthenticationConfiguration authenticationConfiguration;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, UserService userService) throws Exception {
        http.csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers(HttpMethod.GET, "/example/artist").hasRole(ARTIST)
                        .requestMatchers(HttpMethod.GET, "/example/enth").hasRole(ENTHUSIAST)
                        .requestMatchers(HttpMethod.POST, "/artist").permitAll()
                        .requestMatchers(HttpMethod.POST, "/enth").permitAll()
                        .requestMatchers("/playlists/**").hasAnyRole(ARTIST, ENTHUSIAST)
                        .requestMatchers("/me/**").hasAnyRole(ARTIST, ENTHUSIAST)

                        .requestMatchers(HttpMethod.GET, "/albums").hasAnyRole(ENTHUSIAST, ARTIST)
                        .requestMatchers("/albums/**").hasRole(ARTIST)

                        .requestMatchers("/h2-console/**").permitAll()
                        .anyRequest().authenticated())
                .headers(headers -> headers.frameOptions(HeadersConfigurer.FrameOptionsConfig::sameOrigin))
                .addFilter(new JwtAuthenticationFilter(authenticationConfiguration.getAuthenticationManager(), userService))
                .addFilter(new JwtValidationFilter(authenticationConfiguration.getAuthenticationManager()))
                .sessionManagement( manager -> manager.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .cors( cors -> cors.configurationSource(corsConfigurationSource()));
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowCredentials(true);

        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}