package com.seuprojeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "pedido")
@Data
public class Pedido {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pedido")
    private Long idPedido;

    @Column(name = "nome_item")
    private String nomeItem;

    @Column(name = "quantidade")
    private Integer quantidade;

    @Column(name = "status")
    private String status;

    @Column(name = "data_pedido")
    @Temporal(TemporalType.DATE)
    private Date dataPedido;

    @ManyToOne
    @JoinColumn(name = "id_funcionario")
    private Funcionario funcionario;

    @ManyToOne
    @JoinColumn(name = "id_fornecedor")
    private Fornecedor fornecedor;
}