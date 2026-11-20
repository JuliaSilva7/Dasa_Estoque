package com.seuprojeto.service;

import com.seuprojeto.dto.ItemEstoqueDTO;
import com.seuprojeto.dto.UnidadeEstoqueDTO;
import com.seuprojeto.repository.EstoqueInsumoRepository;
import com.seuprojeto.repository.EstoqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DashboardService {

    private final EstoqueRepository estoqueRepository;
    private final EstoqueInsumoRepository estoqueInsumoRepository;

    public List<UnidadeEstoqueDTO> listarUnidadesComItens() {
        List<UnidadeEstoqueDTO> resumo = estoqueRepository.getResumoUnidades();
        List<UnidadeEstoqueDTO> result = new ArrayList<>();

        for (UnidadeEstoqueDTO row : resumo) {
            Long id = row.getId();
            String nome = row.getNomeUnidade();
            String status = row.getStatus();
            Long totalItens = row.getTotalItens();
            Long baixoEstoque = row.getBaixoEstoque();

            // 1. AQUI OCORRE A SEGUNDA CONSULTA PARA CADA UNIDADE
            List<ItemEstoqueDTO> itens = estoqueRepository.findItensByUnidade(id);

            // 2. AQUI A LISTA DE ITENS É ANEXADA AO NOVO DTO
            result.add(new UnidadeEstoqueDTO(id, nome, totalItens, baixoEstoque, status, itens));
        }

        return result;
    }

    public List<ItemEstoqueDTO> listarItensPorEstoque(Long estoqueId) {
        return estoqueRepository.findItensByUnidade(estoqueId);
    }
}