// Dashboard.jsx
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  DownloadOutlined as DownloadOutlinedIcon,
  ProductionQuantityLimits as ProductionQuantityLimitsIcon,
  ArrowDownward as ArrowDownwardIcon,
  Timeline as TimelineIcon,
  Battery50 as Battery50Icon,
  TrendingUp as TrendingUpIcon,
  KeyboardArrowDown,
  KeyboardArrowUp,
} from "@mui/icons-material";
import { tokens } from "../../theme";
import { mockDataMovimentacoes } from "../../data/mockData";
import jsPDF from "jspdf";
import { AuthContext } from "../../context/AuthContext";
import Header from "../../components/Header";
import StatBox from "../../components/StatBox";
import Chatbot from "../chatbot";
import { getEstoques } from "../../data/api.js";
import React, { useContext, useState, useEffect, useMemo } from "react";

// ---------------- COMPONENTE DE LINHA DA UNIDADE -----------------
const UnidadeRow = ({ unidade, colors, isLight }) => {
  const [open, setOpen] = useState(false);

  // Calcula o status da unidade dinamicamente
  const statusDaUnidade = unidade.itens?.some(item => item.quantidade === 0)
    ? "Esgotado"
    : unidade.itens?.some(item => item.quantidade < item.qtdMinima)
    ? "Atenção"
    : "Disponível";

  // Função para determinar a cor do status
  const getStatusStyles = (status) => {
    switch (status) {
      case "Disponível":
        return { backgroundColor: "#4caf50", color: "#fff" }; // verde
      case "Atenção":
        return { backgroundColor: "#ff9800", color: "#fff" }; // amarelo
      case "Esgotado":
        return { backgroundColor: "#f44336", color: "#fff" }; // vermelho
      default:
        return { backgroundColor: "#9e9e9e", color: "#fff" }; // cinza
    }
  };

  return (
    <>
      {/* Linha principal (Unidade) */}
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
          </IconButton>
        </TableCell>
        <TableCell>{unidade.nomeUnidade}</TableCell>
        <TableCell>{unidade.totalItens || 0}</TableCell>
        <TableCell>{unidade.baixoEstoque || 0}</TableCell>
        <TableCell>
          <Box
            sx={{
              display: "inline-block",
              px: 1.5,
              py: 0.5,
              borderRadius: "8px",
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "0.875rem",
              ...getStatusStyles(statusDaUnidade),
            }}
          >
            {statusDaUnidade}
          </Box>
        </TableCell>
      </TableRow>

      {/* Drilldown (Itens da Unidade) */}
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={5}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={2}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Produto</TableCell>
                    <TableCell>Quantidade Atual</TableCell>
                    <TableCell>Quantidade Mínima</TableCell>
                    <TableCell>Quantidade Máxima</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {unidade.itens?.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{item.nomeInsumo}</TableCell>
                      <TableCell>{item.quantidade}</TableCell>
                      <TableCell>{item.qtdMinima}</TableCell>
                      <TableCell>{item.qtdMaxima}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};

// ---------------- COMPONENTE PRINCIPAL -----------------
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const isLight = theme.palette.mode === "light";
  const blackColor = "#000000";

  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const { user } = useContext(AuthContext);

  const titleFontSize = isMobile ? "1rem" : isTablet ? "1.25rem" : "1rem";
  const subtitleFontSize = isMobile ? "0.9rem" : isTablet ? "1.1rem" : "0.9rem";
  const statTitleFontSize = isMobile ? "1.25rem" : isTablet ? "1.5rem" : "1.3rem";
  const statIconSize = isMobile ? 12 : isTablet ? 14 : 16;
  const buttonFontSize = isMobile ? "10px" : isTablet ? "12px" : "14px";

  // -------- ESTADO -----------
  const [unidades, setUnidades] = useState([]);
  const [filtroUnidade, setFiltroUnidade] = useState("");
  const [filtroStatus, setFiltroStatus] = useState("");

  // -------- CHAMADA BACKEND -----------
  useEffect(() => {
    getEstoques()
      .then((data) => setUnidades(Array.isArray(data) ? data : []))
      .catch((err) => {
        console.error(err);
        setUnidades([]);
      });
  }, []);

  // -------- FILTRO ----------
  const unidadesFiltradas = unidades.filter((u) => {
    const statusDaUnidade = u.itens?.some(item => item.quantidade === 0)
      ? "Esgotado"
      : u.itens?.some(item => item.quantidade < item.qtdMinima)
      ? "Atenção"
      : "Disponível";

    return (
      (filtroUnidade === "" || u.nomeUnidade === filtroUnidade) &&
      (filtroStatus === "" || statusDaUnidade === filtroStatus)
    );
  });

  // -------- VALORES DAS CAIXAS --------
  const valoresCaixas = useMemo(() => {
    if (filtroUnidade) {
      const unidade = unidades.find((u) => u.nomeUnidade === filtroUnidade);
      if (unidade) {
        return {
          totalItens: unidade.totalItens || 0,
          baixoEstoque: unidade.baixoEstoque || 0,
          nivelEstoque: unidade.totalItens - (unidade.baixoEstoque || 0),
        };
      }
    }
    const totalItens = unidades.reduce((acc, u) => acc + (u.totalItens || 0), 0);
    const baixoEstoque = unidades.reduce((acc, u) => acc + (u.baixoEstoque || 0), 0);
    return {
      totalItens,
      baixoEstoque,
      nivelEstoque: totalItens - baixoEstoque,
    };
  }, [filtroUnidade, unidades]);

  // -------- RELATÓRIO PDF --------
  const generateTextPDF = () => {
    const doc = new jsPDF();
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text("Relatório de Estoque", 105, 15, { align: "center" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Gerado em: ${new Date().toLocaleString()}`, 105, 23, { align: "center" });

    let y = 35;

    unidadesFiltradas.forEach((unidade) => {
      const statusDaUnidade = unidade.itens?.some(item => item.quantidade === 0)
        ? "Esgotado"
        : unidade.itens?.some(item => item.quantidade < item.qtdMinima)
        ? "Atenção"
        : "Disponível";

      doc.setFont("helvetica", "bold");
      doc.text(`Unidade: ${unidade.nomeUnidade}`, 14, y);
      y += 6;
      doc.setFont("helvetica", "normal");
      doc.text(`Total de Itens: ${unidade.totalItens || 0}`, 14, y);
      doc.text(`Itens com Baixo Estoque: ${unidade.baixoEstoque || 0}`, 80, y);
      doc.text(`Status: ${statusDaUnidade}`, 150, y);
      y += 6;

      doc.setFont("helvetica", "bold");
      doc.text("Produto", 14, y);
      doc.text("Qtd Atual", 80, y);
      doc.text("Qtd Mínima", 110, y);
      doc.text("Qtd Máxima", 140, y);
      y += 4;
      doc.setFont("helvetica", "normal");

      unidade.itens?.forEach((item) => {
        doc.text(`${item.nomeInsumo}`, 14, y);
        doc.text(`${item.quantidade}`, 80, y);
        doc.text(`${item.qtdMinima}`, 110, y);
        doc.text(`${item.qtdMaxima}`, 140, y);
        y += 6;
        if (y > 280) {
          doc.addPage();
          y = 20;
        }
      });

      y += 4;
    });

    doc.save("relatorio_estoque.pdf");
  };


  return (
    <>
      <Box m="20px" mb={"70px"}>
        {/* HEADER */}
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent={isMobile ? "center" : "space-between"}
          alignItems={isMobile ? "flex-start" : "center"}
          gap={isMobile ? "16px" : "0"}
        >
          <Header
            title="Estoque"
            subtitle="Registro da entrada e saída de produtos"
            fontSize={titleFontSize}
            subtitleFontSize={subtitleFontSize}
          />
          <Box>
            <Button
              onClick={generateTextPDF}
              sx={{
                backgroundColor:
                  theme.palette.mode === "dark"
                    ? colors.blueAccent[700]
                    : colors.blueAccent[200],
                color: colors.grey[100],
                fontSize: buttonFontSize,
                fontWeight: "bold",
                padding: isMobile ? "5px 10px" : "10px 20px",
              }}
            >
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Baixar Relatório
            </Button>
          </Box>
        </Box>

        {/* GRID & CHARTS */}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="140px"
          gap="20px"
        >
          {/* Produtos Totais */}
          <Box
            gridColumn="span 3"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <StatBox
              title={valoresCaixas.totalItens.toLocaleString()}
              subtitle="Produtos Totais"
              progress="0.14"
              increase="+14%"
              fontSize={statTitleFontSize}
              icon={
                <ProductionQuantityLimitsIcon
                  sx={{
                    color: isLight
                      ? colors.greenAccent[200]
                      : colors.greenAccent[600],
                    fontSize: statIconSize,
                  }}
                />
              }
              titleFontSize={statTitleFontSize}
              subtitleFontSize={subtitleFontSize}
            />
          </Box>

          {/* Baixo Estoque */}
          <Box
            gridColumn="span 3"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <StatBox
              title={valoresCaixas.baixoEstoque.toLocaleString()}
              subtitle="Produtos com Baixo Estoque"
              progress="0.21"
              increase="+21%"
              icon={
                <ArrowDownwardIcon
                  sx={{
                    color: isLight
                      ? colors.greenAccent[200]
                      : colors.greenAccent[600],
                    fontSize: statIconSize,
                  }}
                />
              }
              titleFontSize={statTitleFontSize}
              subtitleFontSize={subtitleFontSize}
            />
          </Box>

          {/* Movimentações Recentes (mantido fixo) */}
          <Box
            gridColumn="span 3"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <StatBox
              title="146"
              subtitle="Movimentações Recentes"
              progress="0.05"
              increase="+5%"
              icon={
                <TimelineIcon
                  sx={{
                    color: isLight
                      ? colors.greenAccent[200]
                      : colors.greenAccent[600],
                    fontSize: statIconSize,
                  }}
                />
              }
              titleFontSize={statTitleFontSize}
              subtitleFontSize={subtitleFontSize}
            />
          </Box>

          {/* Nível de Estoque */}
          <Box
            gridColumn="span 3"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            display="flex"
            alignItems="center"
            justifyContent="center"
            borderRadius="8px"
          >
            <StatBox
              title={valoresCaixas.nivelEstoque.toLocaleString()}
              subtitle="Nível de Estoque"
              progress="0.63"
              increase="+63%"
              icon={
                <Battery50Icon
                  sx={{
                    color: isLight
                      ? colors.greenAccent[200]
                      : colors.greenAccent[600],
                    fontSize: statIconSize,
                  }}
                />
              }
              titleFontSize={statTitleFontSize}
              subtitleFontSize={subtitleFontSize}
            />
          </Box>

          {/* Predição */}
          <Box
            gridColumn="span 8"
            gridRow="span 1"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            borderRadius="8px"
          >
            <Box
              mt="25px"
              p="0 30px"
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box>
                <Typography
                  variant="h5"
                  fontWeight="600"
                  margin="0"
                  fontSize={titleFontSize}
                  color={isLight ? blackColor : colors.grey[100]}
                >
                  <TrendingUpIcon sx={{ mr: "10px", fontSize: statIconSize }} />
                  Predição
                </Typography>
                <Typography
                  variant="h4"
                  padding="10px 0px"
                  fontSize={subtitleFontSize}
                  color={isLight ? blackColor : colors.greenAccent[500]}
                >
                  Estoque do insumo X acabará em 3 dias.
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Materiais Mais Utilizados */}
          <Box
            gridColumn="span 4"
            gridRow="span 1"
            backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
            overflow="auto"
            borderRadius="8px"
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              borderBottom={`4px solid ${colors.primary[500]}`}
              p="15px"
            >
              <Typography
                color={isLight ? blackColor : colors.grey[100]}
                variant="h5"
                fontWeight="600"
                fontSize={titleFontSize}
              >
                Materiais Mais Utilizados: Últimos 7 Dias
              </Typography>
            </Box>
            {mockDataMovimentacoes.map((dataInsumos, i) => (
              <Box
                key={`${dataInsumos.txId}-${i}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
              >
                <Box>
                  <Typography
                    color={isLight ? blackColor : colors.greenAccent[500]}
                    variant="h5"
                    fontWeight="600"
                    fontSize={subtitleFontSize}
                  >
                    {dataInsumos.id}
                  </Typography>
                  <Typography
                    color={isLight ? blackColor : colors.grey[100]}
                    fontSize={subtitleFontSize}
                  >
                    {dataInsumos.item}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>

        {/* FILTROS */}
        <Box display="flex" gap="20px" mt="20px">
          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Unidade</InputLabel>
            <Select
              value={filtroUnidade}
              label="Unidade"
              onChange={(e) => setFiltroUnidade(e.target.value)}
            >
              <MenuItem value="">Todas</MenuItem>
              {unidades.map((u) => (
                <MenuItem key={u.id} value={u.nomeUnidade}>
                  {u.nomeUnidade}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 150 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={filtroStatus}
              label="Status"
              onChange={(e) => setFiltroStatus(e.target.value)}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="Disponível">Disponível</MenuItem>
              <MenuItem value="Esgotado">Esgotado</MenuItem>
              <MenuItem value="Atenção">Atenção</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* TABELA DE ESTOQUE */}
        <Box
          mt="20px"
          gridColumn="span 12"
          gridRow="span 5"
          backgroundColor={isLight ? "#ffffff" : colors.primary[400]}
          p="30px"
          borderRadius="8px"
          overflow="auto"
        >
          <Typography
            variant="h4"
            fontWeight="600"
            textAlign="center"
            fontSize={titleFontSize}
            color={isLight ? blackColor : colors.grey[100]}
          >
            Tabela de Controle de Estoque
          </Typography>
          <TableContainer
            component={Paper}
            sx={{ marginTop: "20px", backgroundColor: colors.primary[600] }}
          >
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell />
                  <TableCell>Unidade</TableCell>
                  <TableCell>Total de Itens</TableCell>
                  <TableCell>Itens com Baixo Estoque</TableCell>
                  <TableCell>Status</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {unidadesFiltradas.map((unidade) => (
                  <UnidadeRow
                    key={unidade.id}
                    unidade={unidade}
                    colors={colors}
                    isLight={isLight}
                  />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
      <Chatbot />
    </>
  );
};

export default Dashboard;
