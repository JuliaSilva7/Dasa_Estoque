package com.seuprojeto.controller;

import com.seuprojeto.dto.ItemEstoqueDTO;
import com.seuprojeto.service.DashboardService;
import com.seuprojeto.dto.UnidadeEstoqueDTO;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import java.util.List;

@RestController
@RequestMapping("/dashboard")
@RequiredArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;


    @GetMapping
    public List<UnidadeEstoqueDTO> listarUnidades() {
        return dashboardService.listarUnidadesComItens();
    }

    @GetMapping("/{estoqueId}/insumos")
    public List<ItemEstoqueDTO> listarItens(@PathVariable Long estoqueId) {
        return dashboardService.listarItensPorEstoque(estoqueId);
    }

}

