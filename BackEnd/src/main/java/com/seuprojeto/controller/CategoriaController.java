package com.seuprojeto.controller;

import com.seuprojeto.model.Categoria;
import com.seuprojeto.repository.CategoriaRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/categorias")
@CrossOrigin(origins = "*")

public class CategoriaController {
    private final CategoriaRepository repo;
    public CategoriaController(CategoriaRepository repo) { this.repo = repo; }

    @GetMapping
    public List<Categoria> listar() { return repo.findAll(); }

    @PostMapping
    public Categoria salvar(@RequestBody Categoria c) { return repo.save(c); }
}
