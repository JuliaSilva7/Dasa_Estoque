package com.seuprojeto.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Entity
@Table(name = "funcionarios")
@Data
public class Funcionario {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_funcionario")
    private Long idFuncionario;

    @Column(name = "funcional")
    private String funcional;

    @Column(name = "nome")
    private String nome;

    @Column(name = "cpf")
    private String cpf;

    @Column(name = "data_nascimento")
    @Temporal(TemporalType.DATE)
    private Date dataNascimento;

    @Column(name = "salario")
    private Double salario;

    @Column(name = "data_inicio")
    @Temporal(TemporalType.DATE)
    private Date dataInicio;

    @Column(name = "data_termino")
    @Temporal(TemporalType.DATE)
    private Date dataTermino;

    @Column(name = "turno")
    private String turno;

    @Column(name = "cargo")
    private String cargo;

    @Column(name = "senha") // Campo alterado de "senha_hash" para "senha"
    private String senha; // Nome do campo alterado

    @Column(name = "permissao")
    private String permissao;

    @Column(name = "rua")
    private String rua;

    @Column(name = "numero")
    private String numero;

    @Column(name = "bairro")
    private String bairro;

    @Column(name = "cidade")
    private String cidade;

    @Column(name = "estado")
    private String estado;

    @Column(name = "cep")
    private String cep;

    @ManyToOne
    @JoinColumn(name = "id_unidade")
    private Unidade unidade;
}