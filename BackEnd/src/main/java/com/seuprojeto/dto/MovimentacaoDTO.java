package com.seuprojeto.dto;

import lombok.Data;
import java.util.Date;

@Data
public class MovimentacaoDTO {

    private String nomeInsumo;
    private String codigoDeBarras;
    private String lote;
    private Date dataValidade;
    private String tipoEmbalagem;
    private Integer qtdPorEmbalagem;
    private String motivo;
    private Integer qtdMovimentada;
    private Long idFuncionario; // Adicionar o ID do funcionário
    private Long idUnidade;     // Adicionar o ID da unidade
}
