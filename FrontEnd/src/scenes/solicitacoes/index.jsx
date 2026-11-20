import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import { tokens } from "../../theme";
import { Box, Button, Typography } from "@mui/material";
import Header from "../../components/Header";
import ChatBot from "../chatbot";

const Solicitacoes = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [item, setItem] = useState("Máscara N95");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [fromUnit, setFromUnit] = useState("Unit A");
  const [toUnit, setToUnit] = useState("Unit B");

  const labelStyle = {
    color: theme.palette.mode === "dark" ? "#fff" : "#000",
    marginBottom: 4,
  };

  const styles = {
    container: {
      background: theme.palette.mode === "dark" ? colors.primary[400] : "#fff",
      color: theme.palette.mode === "dark" ? colors.primary[400] : "#000",
      padding: 50,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      maxWidth: 750,
      width: "100%",
      marginLeft: "auto",
      marginRight: "auto",
      marginTop: 50,
      paddingLeft: 80,
      borderRadius: 8,
      fontFamily: "Arial, sans-serif",
      boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
      marginBottom: "10%",
    },
    form: {
      display: "flex",
      flexDirection: "column",
      gap: 10,
      width: "100%",
    },
    input: {
      padding: 8,
      fontSize: 14,
      borderRadius: 4,
      border: "1px solid #ccc",
      width: "100%",
    },
    row: {
      display: "flex",
      gap: 10,
    },
    column: {
      flex: 1,
      display: "flex",
      flexDirection: "column",
    },
    button: {
      backgroundColor:
        theme.palette.mode === "dark" ? colors.primary[500] : "#804b4b",
      color: "#fff",
      padding: 10,
      fontSize: 16,
      border: "none",
      borderRadius: 4,
      cursor: "pointer",
      marginTop: 20,
      width: "30%",
      alignSelf: "center",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Transferência solicitada:
Item: ${item}
Quantidade: ${quantity}
De: ${fromUnit}
Para: ${toUnit}
Descrição: ${description}`);
  };

  return (
    <>
    <div style={styles.container}>
      <Typography
        variant="h5"
        fontWeight="bold"
        gutterBottom
        style={{ color: theme.palette.mode === "dark" ? "#fff" : "#000" }}
        
      >
        Solicitação de Transferência de Estoque
      </Typography>

      <form onSubmit={handleSubmit} style={styles.form}>
        <label style={labelStyle}>Item</label>
        <select
          value={item}
          onChange={(e) => setItem(e.target.value)}
          style={styles.input}
        >
          <option>Máscara N95</option>
          <option>Luvas</option>
          <option>Álcool Gel</option>
        </select>

        <div style={styles.row}>
          <div style={styles.column}>
            <label style={labelStyle}>Quantidade</label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.column}>
            <label style={labelStyle}>Descrição</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Insira a descrição (opcional)"
              style={styles.input}
            />
          </div>
        </div>

        <div style={styles.row}>
          <div style={styles.column}>
            <label style={labelStyle}>Unidade Remetente</label>
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              style={styles.input}
            >
              <option>Unit A</option>
              <option>Unit B</option>
              <option>Unit C</option>
            </select>
          </div>
          <div style={styles.column}>
            <label style={labelStyle}>Unidade de Destino</label>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              style={styles.input}
            >
              <option>Unit A</option>
              <option>Unit B</option>
              <option>Unit C</option>
            </select>
          </div>
        </div>

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor:
              theme.palette.mode === "dark" ? colors.primary[500] : "#484646",
            color: "#fff",
            "&:hover": {
              backgroundColor:
                theme.palette.mode === "dark" ? colors.primary[600] : "#454343",
            },
            padding: "5px",
            fontSize: "16px",
            borderRadius: "4px",
            marginTop: "20px",
            width: "70%",
            alignSelf: "center",
            textTransform: "none", 
          }}
        >
          Solicitar Envio
        </Button>
      </form>
    </div>
    <ChatBot />
    </>
  );
};

export default Solicitacoes;
