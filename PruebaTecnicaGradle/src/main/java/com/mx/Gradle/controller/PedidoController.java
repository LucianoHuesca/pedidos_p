package com.mx.Gradle.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.mx.Gradle.dominio.Pedido;
import com.mx.Gradle.service.PedidoService;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    @PostMapping
    public ResponseEntity<?> crearPedido(@RequestBody Pedido pedido) {
        try {
            Pedido pedidoGuardado = pedidoService.guardarPedidoConValidacion(pedido);
            return ResponseEntity.ok(pedidoGuardado);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<List<Pedido>> listar() {
        return ResponseEntity.ok(pedidoService.listarTodos());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Pedido> obtener(@PathVariable Long id) {
        return pedidoService.buscarPorId(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}/estatus")
    public ResponseEntity<Pedido> actualizarEstatus(@PathVariable("id") Long id, @RequestBody Map<String, String> requestBody) {
        // Ahora el estatus se lee del cuerpo JSON
        String estatus = requestBody.get("estatus");
        if (estatus == null || estatus.trim().isEmpty()) {
            // Puedes lanzar una excepción o devolver un BAD_REQUEST explícito
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "El campo 'estatus' es requerido en el cuerpo de la petición.");
        }
        return ResponseEntity.ok(pedidoService.actualizarEstatus(id, estatus.toUpperCase()));
    }
}
