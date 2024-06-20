package com.paco.city_explorer_backend.Dto;

import lombok.Data;

@Data
public class AuthRequest {

    private String email;
    private String password;

}
