package com.seuprojeto.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "unidade")
@Data
public class Unidade {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_unidade")
    private Long id;

    @Column(name = "nome_unidade")
    private String nome; // Lombok gera getNome()

    private String rua;
    private String numero;
    private String bairro;
    private String cidade;
    private String estado;
    private String cep;

    @OneToMany(mappedBy = "unidade", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Estoque> estoques;

    //public void getIdUnidade() {
   // }

    // NÃO precisa de getNome_unidade()
}
