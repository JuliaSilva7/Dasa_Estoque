package com.seuprojeto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EstoqueDTO {
    private Long idEstoque;
    private String unidade;          // nome da unidade
    private String status;
    private int totalItens;
    private int itensBaixoEstoque;
    private List<EstoqueInsumoDTO> estoqueInsumos;
}
