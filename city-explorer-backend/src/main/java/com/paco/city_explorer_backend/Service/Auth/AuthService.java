package com.paco.city_explorer_backend.Service.Auth;

import com.paco.city_explorer_backend.Dto.Auth.AuthRequest;
import com.paco.city_explorer_backend.Dto.Auth.AuthResponse;
import com.paco.city_explorer_backend.Dto.Auth.RegisterRequest;
import com.paco.city_explorer_backend.Exception.UnauthorizedException;
import com.paco.city_explorer_backend.Repository.UserRepository;
import com.paco.city_explorer_backend.Security.JwtTokenProvider;
import com.paco.city_explorer_backend.model.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse login(AuthRequest request) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword()));
            var user = userRepository.findByEmail(request.getEmail())
                    .orElseThrow(() -> new UnauthorizedException("Invalid username or password"));

            Map<String, String> tokens = generateTokens(user);
            return new AuthResponse(tokens.get("accessToken"), tokens.get("refreshToken"));
        } catch (Exception e) {
            throw new UnauthorizedException("Invalid username or password");
        }
    }

    public AuthResponse register(RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new UnauthorizedException("Username is already taken");
        }

        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .build();
        var newUser = userRepository.save(user);

        Map<String, String> tokens = generateTokens(newUser);
        return new AuthResponse(tokens.get("accessToken"), tokens.get("refreshToken"));
    }

    public Map<String, String> generateTokens(User user) {
        String accessToken = jwtTokenProvider.generateToken(user);
        String refreshToken = jwtTokenProvider.generateRefreshToken(user);

        Map<String, String> tokens = new HashMap<>();
        tokens.put("accessToken", accessToken);
        tokens.put("refreshToken", refreshToken);

        return tokens;
    }
}
