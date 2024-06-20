package com.paco.city_explorer_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing(auditorAwareRef = "auditorAware")
public class CityExplorerBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(CityExplorerBackendApplication.class, args);
	}

}
