import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const generatePassword = (length) => {
  const digits = "0123456789";
  let pass = "";
  for (let i = 0; i < length; i++) {
    pass += digits.charAt(Math.floor(Math.random() * digits.length));
  }
  return pass;
};


const Form = () => {
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const [initialValues, setInitialValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    address1: "",
    address2: "",
    birthDate: "",
    cep: "",
    streetNumber: "",
    cpf: "",
    complemento: "",
    senha: "",
    senhaFuncional: "",
  });

  useEffect(() => {
    setInitialValues((prev) => ({
      ...prev,
      senha: generatePassword(6),
      senhaFuncional: generatePassword(8),
    }));
  }, []);

 const handleFormSubmit = (values) => {
  const blob = new Blob([JSON.stringify(values, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "dados.json";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};


  return (
    <Box m="20px">
      <Header title="Criar Novo Usuário" subtitle="Crie um novo Perfil de Usuário" />

      <Button
        variant="contained"
        color="secondary"
        onClick={() => navigate("/configuracoes")}
        sx={{ mt: 0.2, mb: 3 }}
      >
        Voltar para Configurações
      </Button>

      <Formik
        onSubmit={handleFormSubmit}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth variant="filled" type="text" label="Nome"
                onBlur={handleBlur} onChange={handleChange}
                value={values.firstName} name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Sobrenome"
                onBlur={handleBlur} onChange={handleChange}
                value={values.lastName} name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="E-mail"
                onBlur={handleBlur} onChange={handleChange}
                value={values.email} name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Telefone Celular"
                onBlur={handleBlur} onChange={handleChange}
                value={values.contact} name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Endereço"
                onBlur={handleBlur} onChange={handleChange}
                value={values.address1} name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Complemento"
                onBlur={handleBlur} onChange={handleChange}
                value={values.complemento} name="complemento"
                error={!!touched.complemento && !!errors.complemento}
                helperText={touched.complemento && errors.complemento}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Número da Rua"
                onBlur={handleBlur} onChange={handleChange}
                value={values.streetNumber} name="streetNumber"
                error={!!touched.streetNumber && !!errors.streetNumber}
                helperText={touched.streetNumber && errors.streetNumber}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="CEP"
                onBlur={handleBlur} onChange={handleChange}
                value={values.cep} name="cep"
                error={!!touched.cep && !!errors.cep}
                helperText={touched.cep && errors.cep}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="CPF"
                onBlur={handleBlur} onChange={handleChange}
                value={values.cpf} name="cpf"
                error={!!touched.cpf && !!errors.cpf}
                helperText={touched.cpf && errors.cpf}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="date" label="Data de Nascimento"
                onBlur={handleBlur} onChange={handleChange}
                value={values.birthDate} name="birthDate"
                InputLabelProps={{ shrink: true }}
                error={!!touched.birthDate && !!errors.birthDate}
                helperText={touched.birthDate && errors.birthDate}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Senha (6 dígitos)"
                value={values.senha} name="senha" InputProps={{ readOnly: true }}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth variant="filled" type="text" label="Senha Funcional (8 dígitos)"
                value={values.senhaFuncional} name="senhaFuncional" InputProps={{ readOnly: true }}
                sx={{ gridColumn: "span 2" }}
              />
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Criar Usuário
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("obrigatório"),
  lastName: yup.string().required("obrigatório"),
  email: yup.string().email("e-mail inválido").required("obrigatório"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Número de telefone inválido")
    .required("obrigatório"),
  address1: yup.string().required("obrigatório"),
  complemento: yup.string(),
  streetNumber: yup.string().required("obrigatório"),
  cep: yup.string().required("obrigatório"),
  cpf: yup.string().required("obrigatório"),
  birthDate: yup.string().required("obrigatório"),
});

export default Form;
