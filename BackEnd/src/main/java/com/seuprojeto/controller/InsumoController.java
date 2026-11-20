package com.seuprojeto.controller;

import com.seuprojeto.model.Insumo;
import com.seuprojeto.repository.InsumoRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/insumos")
@CrossOrigin(origins = "*")

public class InsumoController {
    private final InsumoRepository repo;

    public InsumoController(InsumoRepository repo) {
        this.repo = repo;
    }

    // Listar todos os insumos
    @GetMapping
    public List<Insumo> listar() {
        return repo.findAll();
    }

    // Buscar insumo por ID
    @GetMapping("/{id}")
    public ResponseEntity<Insumo> buscarPorId(@PathVariable Long id) {
        Optional<Insumo> insumo = repo.findById(id);
        return insumo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Buscar insumo por código de barras (para o leitor)
    @GetMapping("/codigo/{codigo}")
    public ResponseEntity<Insumo> buscarPorCodigo(@PathVariable String codigo) {
        Optional<Insumo> insumo = repo.findByCodigoDeBarras(codigo);
        return insumo.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // Criar ou salvar insumo
    @PostMapping
    public Insumo salvar(@RequestBody Insumo i) {
        return repo.save(i);
    }

    // Atualizar insumo
    @PutMapping("/{id}")
    public ResponseEntity<Insumo> atualizar(@PathVariable Long id, @RequestBody Insumo novo) {
        return repo.findById(id).map(insumo -> {
            insumo.setNome(novo.getNome());
            insumo.setLote(novo.getLote());
            insumo.setCodigoDeBarras(novo.getCodigoDeBarras());
            insumo.setTipoEmbalagem(novo.getTipoEmbalagem());
            insumo.setQtdPorEmbalagem(novo.getQtdPorEmbalagem());
            insumo.setDataValidade(novo.getDataValidade()); // Método corrigido
            return ResponseEntity.ok(repo.save(insumo));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Deletar insumo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        if (repo.existsById(id)) {
            repo.deleteById(id);
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.notFound().build();
    }
}