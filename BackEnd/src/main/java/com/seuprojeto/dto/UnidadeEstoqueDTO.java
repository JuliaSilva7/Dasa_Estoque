package com.seuprojeto.dto;

import com.seuprojeto.dto.ItemEstoqueDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor // O Lombok já gera o construtor com todos os campos
public class UnidadeEstoqueDTO {
    private Long id;
    private String nomeUnidade;
    private Long totalItens;
    private Long baixoEstoque;
    private String status;
    private List<ItemEstoqueDTO> itens; // Este campo deve ser preenchido separadamente
}