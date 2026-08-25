package com.ktsr.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI postOpenAPI() {
        return new OpenAPI()
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                            new SecurityScheme()
                                    .type(SecurityScheme.Type.HTTP)
                                    .scheme("bearer")
                                    .bearerFormat("JWT")))
                .addSecurityItem(new SecurityRequirement()
                        .addList("Bearer Authentication"))
                .info(new Info()
                        .title("POS System API")
                        .description("POS System API Description")
                        .version("1.0")
                        .contact(new Contact()
                                .name("POS System API")
                                .email("possystem@gamil.com")
                                .url("https://github.com/POS System API")))
                .externalDocs(new ExternalDocumentation()
                        .description("POS System API Description"));
    }
}
