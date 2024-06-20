package com.paco.city_explorer_backend.Security;

import com.paco.city_explorer_backend.Dto.AuthRequest;
import com.paco.city_explorer_backend.Dto.AuthResponse;
import com.paco.city_explorer_backend.Exception.UnauthorizedException;
import com.paco.city_explorer_backend.Repository.UserRepository;
import com.paco.city_explorer_backend.model.User;
import com.paco.city_explorer_backend.Security.JwtTokenProvider;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserDetailsServiceImpl(AuthenticationManager authenticationManager, UserRepository userRepository,
                       JwtTokenProvider jwtTokenProvider, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.jwtTokenProvider = jwtTokenProvider;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + email));
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(), user.getPassword(), Collections.emptyList());
    }

    @Transactional
    public AuthResponse authenticate(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));

            UserDetails userDetails = loadUserByUsername(request.getEmail());
            String token = jwtTokenProvider.generateToken(userDetails);
            return new AuthResponse(token);
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid email or password");
        }
    }

    @Transactional
    public AuthResponse registerUser(AuthRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new UnauthorizedException("Email is already taken");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        userRepository.save(user);

        UserDetails userDetails = loadUserByUsername(request.getEmail());
        String token = jwtTokenProvider.generateToken(userDetails);
        return new AuthResponse(token);
    }
}
