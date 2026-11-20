import { Box, useTheme, CircularProgress, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import ChatBot from "../chatbot";
import { useEffect, useState } from "react";

import { getUnidades } from '../../data/api.js'; // função para chamar /api/unidades

const Unidades = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [unidades, setUnidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Função para carregar unidades do backend
  const carregarUnidades = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getUnidades();

      // Garantir que cada unidade tenha um id único
      const dataComId = data.map((unidade, index) => ({
        ...unidade,
        id: unidade.id_unidade || index, // fallback se id_unidade estiver ausente
      }));

      setUnidades(dataComId);
    } catch (err) {
      console.error("Erro ao carregar unidades:", err);
      setError("Não foi possível carregar as unidades.");
    } finally {
      setLoading(false);
    }
  };

  // Carrega as unidades ao montar o componente
  useEffect(() => {
    carregarUnidades();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", flex: 0.3 },
    { field: "nome", headerName: "Nome", flex: 1.5 },
    { field: "rua", headerName: "Rua", flex: 1.2 },
    { field: "numero", headerName: "Número", flex: 0.5 },
    { field: "bairro", headerName: "Bairro", flex: 1 },
    { field: "cidade", headerName: "Cidade", flex: 1 },
    { field: "estado", headerName: "Estado", flex: 0.5 },
    { field: "cep", headerName: "CEP", flex: 0.8 },
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
              rows={unidades}
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

export default Unidades;
