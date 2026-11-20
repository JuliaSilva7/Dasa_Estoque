import { Box, useTheme, CircularProgress, Typography } from "@mui/material"; 
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ChatBot from "../chatbot";
import { useEffect, useState } from "react";

import { getMovimentacoes } from '../../data/api.js'; // função para chamar /movimentacoes

// ... seu imports continuam iguais

const Movimentacoes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar movimentações do backend
  const carregarMovimentacoes = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Buscando movimentações...");
      const data = await getMovimentacoes();
      console.log("Dados recebidos:", data);

      // Formata os dados para o DataGrid com fuso de Brasília
      const formatted = data.map((item, index) => ({
        id: item.idMovimentacoes || `${item.funcionario?.idFuncionario}-${index}-${Date.now()}`,
        funcionario: item.funcionario?.idFuncionario || "N/A",
        motivo: item.motivo,
        entrada: item.dataHoraEntrada
          ? new Date(item.dataHoraEntrada).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
          : "",
        saida: item.dataHoraSaida
          ? new Date(item.dataHoraSaida).toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })
          : "",
        tipo: item.tipoMovimentacao,
        quantidade: item.quantidade,
      }));

      setRows(formatted);
    } catch (err) {
      console.error("Erro completo:", err);
      setError(`Erro ao carregar: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarMovimentacoes();
  }, []);

  const columns = [
    { field: "funcionario", headerName: "Funcionário", flex: 0.5 },
    { field: "motivo", headerName: "Motivo", flex: 1 },
    { field: "entrada", headerName: "Data/Hora Entrada", flex: 1 },
    { field: "saida", headerName: "Data/Hora Saída", flex: 1 },
    { field: "tipo", headerName: "Tipo de Movimentação", flex: 1 },
    { field: "quantidade", headerName: "Quantidade", type: "number", flex: 0.5 },
  ];

  return (
    <>
      <Box m="20px" marginBottom="70px">
        <Box mt="20px" height="75vh">
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center" height="100%">
              <CircularProgress />
            </Box>
          ) : error ? (
            <Typography color="error" align="center">
              {error}
            </Typography>
          ) : (
            <DataGrid
              rows={rows}
              columns={columns}
              getRowId={(row) => row.id} // garante que sempre haja um id
              components={{ Toolbar: GridToolbar }}
              autoHeight
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
            />
          )}
        </Box>
      </Box>
      <ChatBot />
    </>
  );
};

export default Movimentacoes;