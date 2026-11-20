package com.seuprojeto.controller;

import com.seuprojeto.dto.MovimentacaoDTO;
import com.seuprojeto.model.Movimentacao;
import com.seuprojeto.service.MovimentacaoService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/movimentacoes")
@CrossOrigin(origins = "*")
public class MovimentacaoController {

    private final MovimentacaoService movimentacaoService;

    public MovimentacaoController(MovimentacaoService movimentacaoService) {
        this.movimentacaoService = movimentacaoService;
    }

    // Add this GET endpoint
    @GetMapping
    public ResponseEntity<List<Movimentacao>> listarMovimentacoes() {
        List<Movimentacao> movimentacoes = movimentacaoService.listarTodasMovimentacoes();
        return ResponseEntity.ok(movimentacoes);
    }

    @PostMapping("/registrar")
    public ResponseEntity<Void> registrarMovimentacao(@RequestBody MovimentacaoDTO movimentacaoDTO) {
        try {
            movimentacaoService.registrarMovimentacao(movimentacaoDTO);
            return ResponseEntity.ok().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}