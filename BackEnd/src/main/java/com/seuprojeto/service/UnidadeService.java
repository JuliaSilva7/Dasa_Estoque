package com.seuprojeto.service;

import com.seuprojeto.model.Unidade;
import com.seuprojeto.repository.UnidadeRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class UnidadeService {

    private final UnidadeRepository unidadeRepository;

    public UnidadeService(UnidadeRepository unidadeRepository) {
        this.unidadeRepository = unidadeRepository;
    }

    public List<Unidade> listarTodasUnidades() {
        return unidadeRepository.findAll();
    }
}
