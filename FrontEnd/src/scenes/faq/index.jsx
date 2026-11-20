import {
  Box,
  useTheme,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import Header from "../../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../../theme";
import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import ChatBot from "../chatbot";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [form, setForm] = useState({
    assunto: "",
    descricao: "",
    urgencia: "Alta",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // E-mail fixo para onde a reclamação será enviada
    const emailDestino = "heloisafleury012@gmail.com";

    // Dados que serão enviados no e-mail
    const templateParams = {
      assunto: form.assunto,
      descricao: form.descricao,
      urgencia: form.urgencia,
      to_email: "heloisafleury012@gmail.com", // Esse campo deve ser referenciado no template do EmailJS
    };

    emailjs
      .send(
        "service_dalk3ow",  // Seu Service ID do EmailJS
        "template_2qis0mu", // Seu Template ID do EmailJS
        templateParams,
        "uA2AYuqwjaSoix9y-" // Sua Public Key do EmailJS
      )
      .then((response) => {
      console.log("SUCESSO:", response.status, response.text);
      alert("Mensagem enviada com sucesso!");
      setForm({ assunto: "", descricao: "", urgencia: "Alta" });
    })
    .catch((error) => {
      console.error("ERRO:", error); // <- veja o que aparece aqui no console
      alert("Erro ao enviar. Tente novamente.");
    });
  };

  return (
    <>
    <Box m="20px" marginBottom={"70px"}>

      {/* Formulário de Suporte */}
      <Box
        mt={5}
        p={3}
        bgcolor={
          theme.palette.mode === "light"
            ? colors.grey[100]
            : colors.primary[400]
        }
        borderRadius="8px"
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            color:
              theme.palette.mode === "light" ? "#000000" : colors.primary[100],
          }}
        >
          Suporte
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Canal Integrado para reportar problemas
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Assunto"
            variant="outlined"
            name="assunto"
            value={form.assunto}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Descrição"
            placeholder="Insira a descrição do problema..."
            variant="outlined"
            name="descricao"
            value={form.descricao}
            onChange={handleChange}
            margin="normal"
            required
          />

          <TextField
            fullWidth
            select
            label="Urgência"
            name="urgencia"
            value={form.urgencia}
            onChange={handleChange}
            margin="normal"
          >
            <MenuItem value="Alta">Alta</MenuItem>
            <MenuItem value="Média">Média</MenuItem>
            <MenuItem value="Baixa">Baixa</MenuItem>
          </TextField>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mt: 3,
              backgroundColor: "#30475f",
              fontWeight: "bold",
              width: "10%",
            }}
          >
            Enviar
          </Button>
        </form>
      </Box>

      {/* Acordeões de FAQ */}
      <Accordion defaultExpanded sx={{
              mt: 3,
              backgroundColor: theme.palette.mode === "dark"
                        ? colors.primary[400]
                        : "#fff",
            }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h5">Como redefinir minha senha?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Acesse o menu de configurações, clique em "Segurança" e selecione "Redefinir Senha".
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
    <ChatBot />
    </>
  );
};

export default FAQ;
