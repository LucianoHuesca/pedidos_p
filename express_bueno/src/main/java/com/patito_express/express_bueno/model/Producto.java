package com.patito_express.express_bueno.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Producto {

    @Id
    @Column(name = "hawa", length = 100, nullable = false)
    private String hawa;

    @Column(name = "nombre_producto", length = 255)
    private String nombreProducto;

    @Column(name = "precio_lista", nullable = false)
    private Double precioLista;

    @Column(name = "descuento")
    private Double descuento;

    @Column(name = "existencias", nullable = false)
    private Integer existencias;
}
