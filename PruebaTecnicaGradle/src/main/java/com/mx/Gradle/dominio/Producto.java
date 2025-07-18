package com.mx.Gradle.dominio;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Identificador del producto en el sistema de camionetas
    @Column(unique = true, nullable = false)
    private String hawa;

    @Column(nullable = false)
    private String nombre;

    @Column(nullable = false)
    private Integer existencias;

    @Column(name = "precio_lista", nullable = false)
    private Double precioLista;

    @Column
    private Double descuento; // puede ser nulo si no hay descuento
}
