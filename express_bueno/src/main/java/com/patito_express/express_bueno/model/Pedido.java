package com.patito_express.express_bueno.model;
import com.patito_express.express_bueno.model.EstatusPedido;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.*;
import lombok.*;
import java.util.List;
import java.util.ArrayList;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Pedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_evento", nullable = false)
    private LocalDateTime fechaEvento;

    @Column(name = "ip_usuario", length = 50)
    private String ipUsuario;

    @Column(name = "id_tienda", length = 50, nullable = false)
    private String idTienda;

    // Datos del cliente
    @Column(name = "nombre_cliente", length = 255, nullable = false)
    private String nombreCliente;

    @Column(name = "nombre_vendedor", length = 255, nullable = false)
    private String nombreVendedor;

    @Column(name = "descuento_total_pedido")
    private Double descuentoTotalPedido;

    @Enumerated(EnumType.STRING)
    @Column(name = "estatus", nullable = false, length = 20)
    private EstatusPedido estatus;

    @Column(name = "tiempo_creacion", nullable = false)
    private LocalDateTime tiempoCreacion;

    @OneToMany(mappedBy = "pedido", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<DetallePedido> detalles = new ArrayList<>();

    public void addDetalle(DetallePedido detalle) {
        detalles.add(detalle);
        detalle.setPedido(this);
    }

    public void removeDetalle(DetallePedido detalle) {
        detalles.remove(detalle);
        detalle.setPedido(null);
    }

}
