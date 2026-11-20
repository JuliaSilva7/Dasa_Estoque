package com.seuprojeto.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "estoque")
@Data
public class Estoque {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_estoque", updatable = false, nullable = false)
    private Long id;

    private String status;

    @ManyToOne
    @JoinColumn(name = "id_unidade", nullable = false)
    private Unidade unidade;

    @OneToMany(mappedBy = "estoque", fetch = FetchType.EAGER)
    @JsonManagedReference
    private List<EstoqueInsumo> estoqueInsumos;

    // Método auxiliar para total de itens
    public int getTotalItens() {
        return estoqueInsumos != null ? estoqueInsumos.size() : 0;
    }

    // Método auxiliar para itens abaixo do estoque mínimo
    public int getItensBaixoEstoque() {
        if (estoqueInsumos == null) return 0;
        return (int) estoqueInsumos.stream()
                .filter(i -> i.getQuantidade() < i.getQtdMinima())
                .count();
    }

    // Soma das quantidades atuais de todos os insumos
    public int getQtdAtual() {
        if (estoqueInsumos == null) return 0;
        return estoqueInsumos.stream()
                .mapToInt(EstoqueInsumo::getQuantidade)
                .sum();
    }

    // Soma das quantidades mínimas de todos os insumos
    public int getQtdMin() {
        if (estoqueInsumos == null) return 0;
        return estoqueInsumos.stream()
                .mapToInt(EstoqueInsumo::getQtdMinima)
                .sum();
    }

    // Soma das quantidades máximas de todos os insumos
    public int getQtdMax() {
        if (estoqueInsumos == null) return 0;
        return estoqueInsumos.stream()
                .mapToInt(EstoqueInsumo::getQtdMaxima)
                .sum();
    }

    // Retorna a lista de insumos do estoque
    public List<Insumo> getInsumos() {
        if (estoqueInsumos == null) return List.of();
        return estoqueInsumos.stream()
                .map(EstoqueInsumo::getInsumo)
                .toList();
    }

    //public Long getInsumo() {
    //}
}
