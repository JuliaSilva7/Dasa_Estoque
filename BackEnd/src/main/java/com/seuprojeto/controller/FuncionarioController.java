package com.seuprojeto.controller;
import com.seuprojeto.model.Funcionario;
import com.seuprojeto.repository.FuncionarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/funcionarios")
@CrossOrigin(origins = "*")
public class FuncionarioController {
    private final FuncionarioRepository repo;

    public FuncionarioController(FuncionarioRepository repo) {
        this.repo = repo;
    }

    // Endpoint de login que retorna o objeto completo do funcionário
    @PostMapping("/login")
    public ResponseEntity<Funcionario> login(@RequestBody Map<String, String> credentials) {
        String funcional = credentials.get("funcional");
        String senha = credentials.get("senha");

        if (funcional == null || senha == null) {
            return ResponseEntity.badRequest().body(null);
        }

        Optional<Funcionario> funcionario = repo.findByFuncionalAndSenha(funcional, senha);

        if (funcionario.isPresent()) {
            return ResponseEntity.ok(funcionario.get());
        } else {
            return ResponseEntity.status(404).body(null);
        }
    }
}