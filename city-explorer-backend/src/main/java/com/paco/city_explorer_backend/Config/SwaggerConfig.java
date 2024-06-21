package com.paco.city_explorer_backend.Config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Contact;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.servers.Server;

@OpenAPIDefinition(
        info = @Info(
                title = "City Explorer API",
                version = "1.0",
                description = "API Documentation for City Explorer Application",
                contact = @Contact(
                        name = "Amilcar Paco",
                        email = "amilcarcpaco@gmail.com"
                )
        )
)
public class SwaggerConfig {
}
