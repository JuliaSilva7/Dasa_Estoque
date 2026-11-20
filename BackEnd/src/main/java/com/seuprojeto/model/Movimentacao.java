package com.seuprojeto.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;
import java.util.Date;

@Entity
@Table(name = "movimentacoes")
@Data
public class Movimentacao {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_movimentacoes")
    private Long idMovimentacoes;

    @Column(name = "motivo")
    private String motivo;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "America/Sao_Paulo")
    private Date dataHoraEntrada;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss", timezone = "America/Sao_Paulo")
    private Date dataHoraSaida;

    @Column(name = "tipo_movimentacao")
    private String tipoMovimentacao;

    @Column(name = "quantidade")
    private Integer quantidade;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;
}
