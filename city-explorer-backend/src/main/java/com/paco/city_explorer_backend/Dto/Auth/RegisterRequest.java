package com.paco.city_explorer_backend.Dto.Auth;

import lombok.*;


@Builder
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class RegisterRequest {

    private String email;
    private String password;
    private String firstName;
    private String lastName;

}
