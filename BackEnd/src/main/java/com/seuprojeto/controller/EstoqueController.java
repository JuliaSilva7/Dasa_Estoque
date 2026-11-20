package com.seuprojeto.controller;

import com.seuprojeto.dto.UnidadeEstoqueDTO;
import com.seuprojeto.service.EstoqueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/estoques")
@RequiredArgsConstructor
public class EstoqueController {

    private final EstoqueService estoqueService;

    @GetMapping
    public List<UnidadeEstoqueDTO> getEstoques() {
        return estoqueService.listarUnidadesComItens();
    }
}
