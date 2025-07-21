package com.mx.Gradle.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration; // <-- IMPORTANTE: Nueva importación
import org.springframework.web.cors.CorsConfigurationSource; // <-- IMPORTANTE: Nueva importación
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // <-- IMPORTANTE: Nueva importación

import java.util.Arrays; // <-- IMPORTANTE: Nueva importación
import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Deshabilita CSRF
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // Habilita CORS

                .authorizeHttpRequests(authorize -> authorize
                                // 1. Permitir peticiones OPTIONS (preflight de CORS) sin autenticación. ¡CRUCIAL!
                                .requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll()

                                // **** 2. ¡CLAVE! Permitir TODAS las peticiones a /api/** sin autenticación. ****
                                // Esta regla DEBE ir antes de cualquier .authenticated() o reglas más restrictivas para /api/**
                                .requestMatchers("/api/**").permitAll()

                                // 3. Cualquier otra petición que no coincida con /api/** (ej. /, /login, /public)
                                // Si quieres que todo lo demás sea público, déjalo así.
                                .anyRequest().permitAll()

                        // Si en el futuro tienes otras rutas no-API que sí quieres proteger, aquí irían:
                        // .anyRequest().authenticated()
                );
        // Si no usas httpBasic() y todo es permitAll(), puedes eliminar esta línea:
        // .httpBasic(withDefaults());

        return http.build();
    }


    // **** 3. DEFINIR EL BEAN DE CONFIGURACIÓN CORS PARA SPRING SECURITY ****
    // Este bean es utilizado por el método .cors() de HttpSecurity.
    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Definir los orígenes permitidos (la URL de tu frontend)
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:5173", "http://127.0.0.1:5173")); // <-- ¡VERIFICA ESTAS URLs!
        // Definir los métodos HTTP permitidos
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Definir los encabezados permitidos
        configuration.setAllowedHeaders(Arrays.asList("*")); // Permite todos los encabezados
        // Permitir el envío de credenciales (cookies, encabezados de autorización)
        configuration.setAllowCredentials(true);
        // Establecer la duración máxima de la caché para las respuestas preflight
        configuration.setMaxAge(3600L); // 3600 segundos = 1 hora

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        // Registrar la configuración CORS para todas las rutas que empiecen con /api/
        source.registerCorsConfiguration("/api/**", configuration);
        return source;
    }
}
