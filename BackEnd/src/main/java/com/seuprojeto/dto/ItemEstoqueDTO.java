package com.seuprojeto.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor // O Lombok vai gerar o construtor correto
public class ItemEstoqueDTO {
    private String nomeInsumo;
    private Integer quantidade;
    private Integer qtdMinima;
    private Integer qtdMaxima;
}