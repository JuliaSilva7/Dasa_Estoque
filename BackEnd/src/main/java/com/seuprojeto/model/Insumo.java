// Código corrigido
package com.seuprojeto.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "insumo")
@Data
public class Insumo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_insumo")
    private Long idInsumo;

    @Column(name = "nome", nullable = false, length = 100)
    private String nome;

    @Column(name = "lote", length = 50)
    private String lote;

    @Column(name = "codigo_de_barras", length = 50, unique = true)
    private String codigoDeBarras;

    @Column(name = "tipo_embalagem", length = 10, nullable = false)
    private String tipoEmbalagem;

    @Column(name = "qtd_por_embalagem", nullable = false)
    private Integer qtdPorEmbalagem;

    @Column(name = "datavalidade") // Corrigido para 'datavalidade' para alinhar com o SQL
    @Temporal(TemporalType.DATE)
    private Date dataValidade;

    @ManyToOne
    @JoinColumn(name = "id_categoria")
    private Categoria categoria;
}