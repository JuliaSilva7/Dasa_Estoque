package com.seuprojeto.service;

import com.seuprojeto.dto.MovimentacaoDTO;
import com.seuprojeto.model.*;
import com.seuprojeto.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class MovimentacaoService {

    private final MovimentacaoRepository movimentacaoRepository;
    private final EstoqueInsumoRepository estoqueInsumoRepository;
    private final EstoqueRepository estoqueRepository;
    private final InsumoRepository insumoRepository;
    private final FuncionarioRepository funcionarioRepository;

    // Lista todas as movimentações
    public List<Movimentacao> listarTodasMovimentacoes() {
        return movimentacaoRepository.findAll();
    }

    @Transactional
    public void registrarMovimentacao(MovimentacaoDTO dto) {

        // 1. Validar funcionário e unidade
        Optional<Funcionario> funcionarioOpt = funcionarioRepository.findById(dto.getIdFuncionario());
        if (funcionarioOpt.isEmpty() || !funcionarioOpt.get().getUnidade().getId().equals(dto.getIdUnidade())) {
            throw new IllegalArgumentException("Funcionário não autorizado a movimentar neste estoque.");
        }
        Funcionario funcionario = funcionarioOpt.get();

        // 2. Encontrar o insumo pelo código de barras
        Optional<Insumo> insumoOpt = insumoRepository.findByCodigoDeBarras(dto.getCodigoDeBarras());
        if (insumoOpt.isEmpty()) {
            throw new IllegalArgumentException("Insumo não encontrado.");
        }
        Insumo insumo = insumoOpt.get();

        // 3. Encontrar o estoque e o insumo no estoque
        EstoqueInsumoId estoqueInsumoId = new EstoqueInsumoId();
        estoqueInsumoId.setEstoqueId(dto.getIdUnidade());
        estoqueInsumoId.setInsumoId(insumo.getIdInsumo());

        Optional<EstoqueInsumo> estoqueInsumoOpt = estoqueInsumoRepository.findById(estoqueInsumoId);

        EstoqueInsumo estoqueInsumo;
        if (estoqueInsumoOpt.isPresent()) {
            estoqueInsumo = estoqueInsumoOpt.get();
        } else {
            // Se o insumo não existe no estoque, cria um novo registro com quantidade 0
            estoqueInsumo = new EstoqueInsumo();
            estoqueInsumo.setId(estoqueInsumoId);
            estoqueInsumo.setQuantidade(0);
            estoqueInsumo.setQtdMinima(10);
            estoqueInsumo.setQtdMaxima(100);
            estoqueInsumo.setEstoque(
                    estoqueRepository.findById(dto.getIdUnidade())
                            .orElseThrow(() -> new IllegalArgumentException("Estoque não encontrado."))
            );
            estoqueInsumo.setInsumo(insumo);
        }

        // 4. Normalizar motivo
        String motivo = dto.getMotivo() != null ? dto.getMotivo().trim() : "";
        switch (motivo.toLowerCase()) {
            case "reabastecimento":
                motivo = "Reabastecimento";
                break;
            case "transferência":
            case "transferencia":
                motivo = "Transferência";
                break;
            case "vencimento":
                motivo = "Vencimento";
                break;
            case "avaria":
                motivo = "Avaria";
                break;
            default:
                throw new IllegalArgumentException("Motivo inválido para movimentação.");
        }

        // 5. Definir tipo de movimentação explicitamente
        String tipoMovimentacao;
        if (motivo.equals("Reabastecimento")) {
            tipoMovimentacao = "Entrada"; // soma no estoque
        } else if (motivo.equals("Vencimento") || motivo.equals("Avaria") || motivo.equals("Transferência")) {
            tipoMovimentacao = "Saída"; // subtrai do estoque
        } else {
            throw new IllegalArgumentException("Motivo inválido para movimentação.");
        }

        // 6. Criar movimentação
        Movimentacao movimentacao = new Movimentacao();
        movimentacao.setMotivo(motivo);
        movimentacao.setTipoMovimentacao(tipoMovimentacao);
        movimentacao.setQuantidade(dto.getQtdMovimentada());
        movimentacao.setFuncionario(funcionario);
        movimentacaoRepository.save(movimentacao);

        // 7. Atualizar quantidade no estoque
        int qtdMovimentada = dto.getQtdMovimentada();
        int quantidadeAtual = estoqueInsumo.getQuantidade();

        // Log para debug
        System.out.println("Estoque atual: " + quantidadeAtual +
                " Movimentação: " + qtdMovimentada +
                " Motivo: " + motivo);

        int novaQuantidade;
        if (tipoMovimentacao.equals("Entrada")) {
            novaQuantidade = quantidadeAtual + qtdMovimentada;
        } else { // Saída
            novaQuantidade = quantidadeAtual - qtdMovimentada;
        }

        if (novaQuantidade < 0) {
            throw new IllegalArgumentException("Quantidade no estoque insuficiente para esta movimentação.");
        }

        estoqueInsumo.setQuantidade(novaQuantidade);
        estoqueInsumoRepository.save(estoqueInsumo);
    }
}
