package com.unnoba.allmusic_back.service;

import com.unnoba.allmusic_back.entity.User;
import com.unnoba.allmusic_back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class AuthService implements UserDetailsService {

    @Autowired
    private UserRepository usuarioRepository;


    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = usuarioRepository.findByUsername(username).orElseThrow(
                () -> new UsernameNotFoundException(String.format("Username %s no encontrada", username))
        );

        String userTypeRole = "ROLE_" + user.getClass().getSimpleName().toUpperCase();

        List<GrantedAuthority> authorities = List.of(new SimpleGrantedAuthority(userTypeRole));

        return new org.springframework.security.core.userdetails.User(
                username, user.getPassword(),
                true, true, true, true, authorities
        );
    }
}
