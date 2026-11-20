import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";

import { AuthContext } from "../../context/AuthContext"; // ✅ importa o contexto de autenticação

const Topbar = ({ onSearch }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const navigate = useNavigate();

  const { logout } = useContext(AuthContext); // ✅ acessa a função logout

  const handleInputChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login"); // ✅ redireciona para login após logout
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* BARRA DE BUSCA */}
      <Box
        display="flex"
        backgroundColor={
          theme.palette.mode === "light" ? "#ffffff" : colors.primary[400]
        }
        borderRadius="3px"
        alignItems="center"
        pl={1}
        pr={1}
      >
        <InputBase
          sx={{
            ml: 1,
            flex: 1,
            color:
              theme.palette.mode === "light" ? "#000000" : colors.grey[100],
          }}
          placeholder="Busca"
          onChange={handleInputChange}
        />
        <IconButton
          sx={{
            color:
              theme.palette.mode === "light" ? "#000000" : colors.grey[100],
          }}
        >
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ÍCONES */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton onClick={() => navigate("/configuracoes")}>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton onClick={handleLogout}> {/* ✅ logout aqui */}
          <PersonOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
