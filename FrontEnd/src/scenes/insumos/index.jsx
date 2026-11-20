import { Box, useTheme } from "@mui/material";
import TakeoutDiningOutlinedIcon from "@mui/icons-material/TakeoutDiningOutlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";

import { tokens } from "../../theme";
import StatBox from "../../components/StatBox";
import ChatBot from "../chatbot";
import { useEffect, useState } from "react";

import { getInsumos } from '../../data/api.js';

const Insumos = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [insumos, setInsumos] = useState([]);

  // Função para carregar insumos do backend
  async function carregarInsumos() {
    try {
      const data = await getInsumos();
      setInsumos(data);
    } catch (err) {
      console.error("Erro ao carregar insumos:", err);
    }
  }

  // Carrega os insumos ao montar o componente
  useEffect(() => {
    carregarInsumos();
  }, []);

  const columns = [
    { field: "idInsumo", headerName: "ID", flex: 0.3 },
    { field: "nome", headerName: "Item", flex: 1 },
    { field: "lote", headerName: "Lote", flex: 0.7 },
    {
      field: "dataValidade",
      headerName: "Vencimento",
      flex: 0.8,
      renderCell: ({ value }) => {
        if (!value) return "-";
        const date = new Date(value);
        return date.toLocaleDateString("pt-BR");
      },
    },
    { field: "tipoEmbalagem", headerName: "Tipo de Embalagem", flex: 1 },
    { field: "codigoDeBarras", headerName: "Código de Barras", flex: 1 },
    { field: "qtdPorEmbalagem", headerName: "Qtd por Embalagem", type: "number", flex: 0.8 },
  ];

  return (
    <>
      <Box m="20px" marginBottom="70px">
        {/* Estatísticas */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
          mt="20px"
        >
          {/* Total de insumos */}
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.mode === "light" ? colors.grey[100] : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
          >
            <StatBox
              title={insumos.length}
              subtitle="Insumos"
              icon={<TakeoutDiningOutlinedIcon sx={{ color: colors.greenAccent[200], fontSize: "26px" }} />}
            />
          </Box>

          {/* Insumos com vencimento nos próximos 3 meses */}
          <Box
            gridColumn="span 3"
            backgroundColor={theme.palette.mode === "light" ? colors.grey[100] : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius={2}
          >
            <StatBox
              title={
                insumos.filter(i => {
                  if (!i.dataValidade) return false;
                  const hoje = new Date();
                  const tresMeses = new Date();
                  tresMeses.setMonth(hoje.getMonth() + 3);

                  const vencimento = new Date(i.dataValidade);
                  return vencimento >= hoje && vencimento <= tresMeses;
                }).length
              }
              subtitle="Vencimento Próximo"
              icon={<ReportProblemOutlinedIcon sx={{ color: colors.greenAccent[200], fontSize: "26px" }} />}
            />
          </Box>
        </Box>

        {/* Data Grid */}
        <Box mt="40px">
          <Box mt="20px" height="75vh">
            <DataGrid
              rows={insumos}
              columns={columns}
              getRowId={(row) => row.idInsumo}
              components={{ Toolbar: GridToolbar }}
            />
          </Box>
        </Box>
      </Box>
      <ChatBot />
    </>
  );
};

export default Insumos;
