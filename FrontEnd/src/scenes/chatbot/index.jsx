import React, { useState } from "react";
import {
  Box,
  TextField,
  IconButton,
  Typography,
  Paper,
  Fab,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import ChatIcon from "@mui/icons-material/Chat";

const ChatBot = () => {
  const initialMessages = [
    { from: "bot", text: "Olá! Sou o Daz, seu Assistente Virtual da Dasa 😊" },
    { from: "bot", text: "Como posso te ajudar?" },
    {
      from: "bot",
      text:
        "Digite uma das opções abaixo:\n\n1 - Verificar status de solicitação\n2 - Ver insumos em nível crítico\n3 - Ver insumos com validade próxima\n4 - Consultar saldo de insumos\n5 - Manual rápido\n6 - Consultar dados do colaborador",
    },
  ];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState(initialMessages);
  const [awaitingInput, setAwaitingInput] = useState(null); // para rastrear se estamos aguardando o insumo

  const getBotResponse = async (msg) => {
    // --- Se estiver aguardando o nome do insumo para saldo ---
    if (awaitingInput === "insumoSaldo") {
      try {
        const res = await fetch("http://localhost:8080/insumos");
        const insumos = await res.json();
        const filtro = insumos.find(
          (i) => i.nome.toLowerCase() === msg.toLowerCase()
        );
        setAwaitingInput(null); // resetar estado
        if (filtro) {
          // Determinar status
          let status = "";
          if (filtro.qtdPorEmbalagem === 0) status = "Esgotado ❌";
          else if (filtro.qtdPorEmbalagem < 10) status = "Baixo ⚠️";
          else status = "Normal ✅";

          return `📊 Saldo do insumo "${filtro.nome}":\n- Qtd/Emb: ${filtro.qtdPorEmbalagem}\n- Tipo de embalagem: ${filtro.tipoEmbalagem}\n- Status: ${status}`;
        } else {
          return `❌ Insumo "${msg}" não encontrado. Tente novamente digitando um nome válido.`;
        }
      } catch (err) {
        console.error(err);
        return "⚠️ Erro ao consultar saldo de insumos.";
      }
    }

    // --- Switch para opções iniciais ---
    switch (msg) {
      case "1":
        return "Você escolheu: Verificar status de solicitação. (Integração futura)";
      case "2": {
        try {
          const res = await fetch("http://localhost:8080/insumos");
          const insumos = await res.json();
          const criticos = insumos.filter((i) => i.qtdPorEmbalagem < 10);
          if (criticos.length === 0) return "Nenhum insumo em nível crítico 👍";
          return (
            "📦 Insumos em nível crítico:\n\n" +
            criticos.map((i) => `- ${i.nome} (Qtd: ${i.qtdPorEmbalagem})`).join("\n")
          );
        } catch (err) {
          console.error(err);
          return "⚠️ Erro ao consultar insumos críticos.";
        }
      }
      case "3": {
        try {
          const res = await fetch("http://localhost:8080/insumos");
          const insumos = await res.json();
          const hoje = new Date();
          const proximos = insumos.filter((i) => {
            if (!i.dataValidade) return false;
            const validade = new Date(i.dataValidade);
            const diffDias = (validade - hoje) / (1000 * 60 * 60 * 24);
            return diffDias <= 30 && diffDias >= 0;
          });
          if (proximos.length === 0) return "Nenhum insumo com validade próxima 👌";
          return (
            "⏳ Insumos com validade próxima (até 30 dias):\n\n" +
            proximos
              .map(
                (i) =>
                  `- ${i.nome} (Val: ${new Date(i.dataValidade).toLocaleDateString(
                    "pt-BR"
                  )})`
              )
              .join("\n")
          );
        } catch (err) {
          console.error(err);
          return "⚠️ Erro ao consultar insumos por validade.";
        }
      }
      case "4":
        setAwaitingInput("insumoSaldo");
        return "Digite o nome do insumo que deseja consultar o saldo:";
      case "5":
        return "📘 Acesse o Manual Rápido neste link: [manual.pdf]";
      case "6":
        return "Digite o nome ou matrícula do colaborador para consultar.";
      default:
        return "❓ Desculpe, não entendi. Digite um número de 1 a 6.";
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = { from: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);

    const botResponse = await getBotResponse(input.trim());
    const botMsg = { from: "bot", text: botResponse };
    setMessages((prev) => [...prev, botMsg]);
    setInput("");
  };

  const handleToggleChat = () => {
    if (open) {
      // resetar chat ao fechar
      setMessages(initialMessages);
      setAwaitingInput(null);
    }
    setOpen(!open);
  };

  return (
    <>
      <Fab
        onClick={handleToggleChat}
        sx={{
          position: "fixed",
          bottom: 24,
          right: 24,
          zIndex: 1000,
          backgroundColor: "#1976d2",
          color: "#ffffff",
          "&:hover": { backgroundColor: "#115293" },
        }}
      >
        <ChatIcon />
      </Fab>

      {open && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 24,
            width: 360,
            height: 500,
            borderRadius: 3,
            p: 2,
            display: "flex",
            flexDirection: "column",
            zIndex: 999,
          }}
        >
          <Box sx={{ flexGrow: 1, overflowY: "auto", mb: 1 }}>
            {messages.map((msg, i) => (
              <Typography
                key={i}
                align={msg.from === "bot" ? "left" : "right"}
                sx={{
                  background: msg.from === "bot" ? "#eee" : "#1976d2",
                  color: msg.from === "bot" ? "black" : "white",
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  my: 1,
                  maxWidth: "75%",
                  wordBreak: "break-word",
                  whiteSpace: "pre-wrap",
                }}
              >
                {msg.text}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: "flex" }}>
            <TextField
              variant="outlined"
              size="small"
              fullWidth
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Escreva uma mensagem..."
            />
            <IconButton color="primary" onClick={handleSend}>
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </>
  );
};

export default ChatBot;
