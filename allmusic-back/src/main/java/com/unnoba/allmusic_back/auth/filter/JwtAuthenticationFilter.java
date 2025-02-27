package com.unnoba.allmusic_back.auth.filter;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.unnoba.allmusic_back.auth.TokenJwtConfig;
import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.service.UserService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class JwtAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final UserService userService;


    public JwtAuthenticationFilter(AuthenticationManager authenticationManager, UserService userService) {
        this.authenticationManager = authenticationManager;
        this.userService = userService;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {
        User user = null;
        String username = null;
        String password = null;

        try {
            Map<String, String> requestBody = new ObjectMapper().readValue(request.getInputStream(), new TypeReference<Map<String, String>>() {});
            username = requestBody.get("username");
            password = requestBody.get("password");
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password);
        return this.authenticationManager.authenticate(authToken);
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) throws IOException, ServletException {
        Map<String, Object> details = new HashMap<>();
        details.put("message", "Error en la autenticación.");
        details.put("error", failed.getMessage());
        response.getWriter().write(new ObjectMapper().writeValueAsString(details));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
        response.setContentType("application/json");
    }

    @Override
    protected void successfulAuthentication(
            HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authResult)
            throws IOException, ServletException {

        String username = ((org.springframework.security.core.userdetails.User) authResult.getPrincipal()).getUsername();
        Collection<? extends GrantedAuthority> roles = authResult.getAuthorities();
        boolean isArtist = roles
                .stream()
                .anyMatch(r -> r.getAuthority().equals("ROLE_MUSICARTIESUSER"));

        Claims claims = Jwts.claims()
                .add("authorities", new ObjectMapper().writeValueAsString(roles))
                .add("isArtist", isArtist)
                .build();

        // Token generado con JSON Token Web
        String token = Jwts.builder()
                .claims(claims)
                .subject(username)
                .signWith(TokenJwtConfig.SECRET_KEY)
                .issuedAt(new Date())
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))  // 1 hora
                .compact();

        response.addHeader(TokenJwtConfig.HEADER_AUTHORIZATION, TokenJwtConfig.PREFIX_TOKEN + token);
        Map<String, Object> datas = new HashMap<>();
        datas.put("token", token);
        datas.put("message", String.format("Hola %s, has iniciado sesión con éxito", username));

        response.getWriter().write(new ObjectMapper().writeValueAsString(datas));
        response.setStatus(HttpServletResponse.SC_OK);
        response.setContentType("application/json");
    }
}

