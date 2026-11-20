package com.seuprojeto.controller;

import com.seuprojeto.model.Unidade;
import com.seuprojeto.service.UnidadeService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/unidades")
@CrossOrigin(origins = "*") // permite chamadas do front-end
public class UnidadeController {

    private final UnidadeService unidadeService;

    // Construtor para injeção do serviço
    public UnidadeController(UnidadeService unidadeService) {
        this.unidadeService = unidadeService;
    }


    // Retorna todas as unidades
    @GetMapping
    public List<Unidade> getUnidades() {
        return unidadeService.listarTodasUnidades();
    }
}
