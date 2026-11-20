package com.seuprojeto.repository;

import com.seuprojeto.dto.ItemEstoqueDTO;
import com.seuprojeto.model.Estoque;
import com.seuprojeto.dto.UnidadeEstoqueDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface EstoqueRepository extends JpaRepository<Estoque, Long> {

    @Query("SELECT new com.seuprojeto.dto.UnidadeEstoqueDTO(" +
            "e.id, e.unidade.nome, COUNT(i), SUM(CASE WHEN i.quantidade < i.qtdMinima THEN 1 ELSE 0 END), e.status, null) " +
            "FROM Estoque e LEFT JOIN e.estoqueInsumos i " +
            "GROUP BY e.id, e.unidade.nome, e.status")
    List<UnidadeEstoqueDTO> getResumoUnidades();

    @Query("SELECT new com.seuprojeto.dto.ItemEstoqueDTO(" +
            "ei.insumo.nome, ei.quantidade, ei.qtdMinima, ei.qtdMaxima) " +
            "FROM Estoque e JOIN e.estoqueInsumos ei " +
            "WHERE e.unidade.id = :idUnidade")
    List<ItemEstoqueDTO> findItensByUnidade(@Param("idUnidade") Long idUnidade);
}