// Código corrigido para EstoqueInsumoId
package com.seuprojeto.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.Data;
import java.io.Serializable;

@Data
@Embeddable
public class EstoqueInsumoId implements Serializable {

    @Column(name = "id_estoque")
    private Long estoqueId;

    @Column(name = "id_insumo")
    private Long insumoId;
}