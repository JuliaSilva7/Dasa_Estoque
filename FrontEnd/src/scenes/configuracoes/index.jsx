import React from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import ChatBot from "../chatbot";

const Configuracoes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const styles = {
    container: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? colors.primary[500]
          : colors.grey[900],
      padding: "40px",
      minHeight: "80vh",
      marginTop: "20px",
      marginBottom: "70px",
    },
    grid: {
      display: "grid",
      gridTemplateColumns: "repeat(2, 1fr)",
      gap: "25px",
      marginTop: "30px",
      
      
    },
    card: {
      backgroundColor:
        theme.palette.mode === "dark"
          ? colors.primary[400]
          : "white",
      padding: "30px",
      borderRadius: "10px",
      textAlign: "left",
      boxShadow:
        theme.palette.mode === "dark"
          ? "0 2px 1px rgba(255, 255, 255, 0.1)"
          : "0 2px 1px rgba(0, 0, 0, 0.1)",
      color:
        theme.palette.mode === "dark"
          ? "#fff"
          : "#000",
      
    },
    title: {
      margin: "0 0 20px 0",
      fontSize: "1.1rem",
    },
    button: {
      padding: "10px 20px",
      borderRadius: "6px",
      border: "1px solid #999",
      backgroundColor:
        theme.palette.mode === "dark"
          ? colors.blueAccent[700]
          : "#d9d9d9",
      color:
        theme.palette.mode === "dark"
          ? "#fff"
          : "#333",
      cursor: "pointer",
    },
  };

  const Card = ({ title, buttonText, onClick }) => (
    <div style={styles.card}>
      <h3 style={styles.title}>{title}</h3>
      <button style={styles.button} onClick={onClick}>
        {buttonText}
      </button>
    </div>
  );

  return (
    <>
    <div style={styles.container}>
      <Header subtitle="Gerencie o sistema" />

      <div style={styles.grid}>
        <Card
          title="Perfis de Acesso"
          buttonText="Gerenciar Usuários"
          onClick={() => navigate("/team")}
        />
        <Card
          title="Criação de Novo Usuário"
          buttonText="Novo Usuário"
          onClick={() => navigate("/form")}
        />
        <Card
          title="Avisos e Notificações"
          buttonText="Receber Alertas"
          onClick={() => alert("Funcionalidade em construção")}
        />
        <Card
          title="Integração com SAP"
          buttonText="Conectar"
          onClick={() => alert("Integração ainda não configurada")}
        />
      </div>
    </div>
    <ChatBot/>
    </>
  );
};

export default Configuracoes;
