package com.seuprojeto.dto;

import lombok.Data;

@Data
public class EstoqueInsumoDTO {
    private Long id;
    private String nome;
    private int quantidade;

    public EstoqueInsumoDTO() {}

    public EstoqueInsumoDTO(Long id, String nome, int quantidade) {
        this.id = id;
        this.nome = nome;
        this.quantidade = quantidade;
    }
}

