package com.seuprojeto.repository;

import java.util.Optional;
import com.seuprojeto.model.Insumo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface InsumoRepository extends JpaRepository<Insumo, Long> {
    Optional<Insumo> findByCodigoDeBarras(String codigoDeBarras);
}

