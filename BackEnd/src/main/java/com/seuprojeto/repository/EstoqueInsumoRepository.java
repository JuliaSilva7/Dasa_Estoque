package com.seuprojeto.repository;

import com.seuprojeto.dto.ItemEstoqueDTO;
import com.seuprojeto.model.EstoqueInsumo;
import com.seuprojeto.model.EstoqueInsumoId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EstoqueInsumoRepository extends JpaRepository<EstoqueInsumo, EstoqueInsumoId> {

    @Query("""
        SELECT new com.seuprojeto.dto.ItemEstoqueDTO(
            i.nome, ei.quantidade, ei.qtdMinima, ei.qtdMaxima
        )
        FROM EstoqueInsumo ei
        JOIN ei.insumo i
        WHERE ei.estoque.id = :estoqueId
    """)
    List<ItemEstoqueDTO> findByEstoqueId(@Param("estoqueId") Long estoqueId);
}