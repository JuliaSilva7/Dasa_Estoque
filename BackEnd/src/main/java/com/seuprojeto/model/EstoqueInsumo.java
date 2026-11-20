package com.seuprojeto.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "estoque_insumo")
@Data
public class EstoqueInsumo {

    @EmbeddedId
    private EstoqueInsumoId id;

    private Integer quantidade;

    @Column(name = "QTD_MINIMA")
    private Integer qtdMinima;

    @Column(name = "QTD_MAXIMA")
    private Integer qtdMaxima;

    @ManyToOne
    @MapsId("estoqueId") // mapeia estoqueId da PK
    @JoinColumn(name = "id_estoque", nullable = false)
    @JsonBackReference
    private Estoque estoque;

    @ManyToOne
    @MapsId("insumoId") // mapeia insumoId da PK
    @JoinColumn(name = "id_insumo", nullable = false)
    private Insumo insumo;
}