import React, { useRef } from "react";
import { tokens } from "../../theme";
import Header from "../../components/Header";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { Box, Button, useTheme } from "@mui/material";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import ChatBot from "../chatbot";

const dataBarra = [
  { nome: "Seringas", Quantidade: 400 },
  { nome: "Lenços", Quantidade: 300 },
  { nome: "Máscaras", Quantidade: 200 },
  { nome: "Aventais", Quantidade: 278 },
  { nome: "Luvas", Quantidade: 189 },
];

const dataLinha = [
  { dia: "Hoje", estoque: 60 },
  { dia: "Amanhã", estoque: 40 },
  { dia: "Em 2 dias", estoque: 20 },
  { dia: "Em 3 dias", estoque: 0 },
];

const Relatorios = () => {
  const chartRef = useRef(null); // área visível no site
  const pdfRef = useRef(null); // área escondida para PDF

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const gerarPDF = async () => {
    if (!pdfRef.current) return;
    // captura a área escondida (pdfRef)
    const canvas = await html2canvas(pdfRef.current, { scale: 2, backgroundColor: "#ffffff" });
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 10, pdfWidth, pdfHeight);
    pdf.save("relatorio_completo.pdf");
  };

  return (
    <>
    <div style={{ padding: 20, marginBottom: "70px" }}>
      <Header subtitle="Insumos e Predição de Ruptura" />

      <Button
        variant="contained"
        color="primary"
        onClick={gerarPDF}
        style={{ marginBottom: 20 }}
      >
        Baixar Relatório em PDF
      </Button>

      {/* Área visível com gráficos lado a lado */}
      <div
        ref={chartRef}
        style={{
          padding: 20,
          borderRadius: 8,
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          backgroundColor:
            theme.palette.mode === "light" ? "#ffffff" : colors.primary[400],
          display: "flex",
        }}
      >
        <div
          style={{
            width: "100%",
            height: 300,
            marginBottom: 40,
            paddingRight: 50,
          }}
        >
          <h3 style={{ textAlign: "center" }}>Insumos Mais Retirados</h3>
          <ResponsiveContainer>
            <BarChart data={dataBarra}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Quantidade" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={{ width: "100%", height: 300 }}>
          <h3 style={{ textAlign: "center" }}>
            Predição de Ruptura de Estoque
          </h3>
          <ResponsiveContainer>
            <LineChart data={dataLinha}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="estoque"
                stroke="#ff4d4f"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Área escondida para PDF - gráficos um abaixo do outro, fundo branco */}
      <div
        ref={pdfRef}
        style={{
          padding: 20,
          borderRadius: 8,
          backgroundColor: "#ffffff",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          position: "fixed",
          left: -9999, // esconde fora da tela
          top: 0,
          width: "210mm", // largura A4 em mm
        }}
      >
        <div
          style={{
            width: "180mm",
            height: 300,
            marginBottom: 40,
          }}
        >
          <h3 style={{ textAlign: "center", color: "#000" }}>
            Insumos Mais Retirados
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dataBarra}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="nome" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Quantidade" fill="#8884d8" barSize={50} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            width: "180mm",
            height: 300,
            marginBottom: 40,
          }}
        >
          <h3 style={{ textAlign: "center", color: "#000" }}>
            Predição de Ruptura de Estoque
          </h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dataLinha}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="dia" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="estoque"
                stroke="#ff4d4f"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
    <ChatBot />
    </>
  );
};

export default Relatorios;
