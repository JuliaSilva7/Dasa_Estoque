package com.seuprojeto.controller;

import com.seuprojeto.model.Pedido;
import com.seuprojeto.repository.PedidoRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pedidos")
@CrossOrigin(origins = "*")
public class PedidoController {
    private final PedidoRepository repo;
    public PedidoController(PedidoRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Pedido> listar() { return repo.findAll(); }

    @PostMapping
    public Pedido salvar(@RequestBody Pedido p) { return repo.save(p); }
}
