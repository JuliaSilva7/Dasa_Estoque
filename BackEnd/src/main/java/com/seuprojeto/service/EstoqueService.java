package com.seuprojeto.service;

import com.seuprojeto.dto.ItemEstoqueDTO;
import com.seuprojeto.dto.UnidadeEstoqueDTO;
import com.seuprojeto.repository.EstoqueRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EstoqueService {
    private final EstoqueRepository estoqueRepository;

    public List<UnidadeEstoqueDTO> listarUnidadesComItens() {
        List<UnidadeEstoqueDTO> unidades = estoqueRepository.getResumoUnidades();

        for (UnidadeEstoqueDTO unidade : unidades) {
            List<ItemEstoqueDTO> itens = estoqueRepository.findItensByUnidade(unidade.getId());
            unidade.setItens(itens);
        }
        return unidades;
    }
}
