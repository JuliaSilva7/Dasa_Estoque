package com.seuprojeto.repository;

import com.seuprojeto.model.Funcionario;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional; // Importe esta classe para usar o Optional

public interface FuncionarioRepository extends JpaRepository<Funcionario, Long> {

    // Este método permite ao Spring Data JPA encontrar um funcionário
    // usando o número funcional e o hash da senha.
    Optional<Funcionario> findByFuncionalAndSenha(String funcional, String senha);
}