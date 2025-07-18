package com.patito_express.express_bueno.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;


@Entity
@Table(name = "detalle_pedidos")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetallePedido {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "pedido_id", nullable = false)

    private Pedido pedido;
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "hawa_producto", referencedColumnName = "hawa", nullable = false)

    private Producto producto;
    @Column(name = "cantidad", nullable = false)

    private Integer cantidad;
    @Column(name = "precio_unitario_al_momento_pedido", nullable = false)
    private Double precioUnitarioAlMomentoPedido;
    @Column(name = "descuento_unitario_aplicado")
    private Double descuentoUnitarioAplicado;
}
