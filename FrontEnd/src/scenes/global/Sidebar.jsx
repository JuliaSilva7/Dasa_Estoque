import { useState, useEffect } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../theme";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PinDropIcon from "@mui/icons-material/PinDropOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import ChangeCircleOutlinedIcon from "@mui/icons-material/ChangeCircleOutlined";
import SensorsOutlinedIcon from "@mui/icons-material/SensorsOutlined";
import AssessmentOutlinedIcon from "@mui/icons-material/AssessmentOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import dasa3 from "../../assets/DASA3.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <MenuItem
      active={selected === title}
      style={{ color: colors.grey[100] }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography fontSize="15px" fontWeight="500">
        {title}
      </Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = ({ isSidebar, isMobile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  // Começa colapsado em mobile, expandido em desktop
  const [isCollapsed, setIsCollapsed] = useState(isMobile);
  const [selected, setSelected] = useState("Dashboard");

  // Atualiza colapso automaticamente ao mudar tamanho da tela
  useEffect(() => {
    setIsCollapsed(isMobile);
  }, [isMobile]);

  // Estilos customizados com responsividade
  const sidebarStyles = {
    "& .pro-sidebar-inner": {
      background: `${colors.primary[400]} !important`,
    },
    "& .pro-icon-wrapper": {
      backgroundColor: "transparent !important",
    },
    "& .pro-inner-item": {
      padding: "5px 35px 5px 20px !important",
    },
    "& .pro-inner-item:hover": {
      color: "#868dfb !important",
    },
    "& .pro-menu-item.active": {
      color: "#6870fa !important",
    },
    position: isMobile ? "absolute" : "relative",
    zIndex: isMobile ? 1300 : "auto",
    height: "100vh",
    width: isCollapsed ? "80px" : "250px",
    transition: "all 0.3s ease",
    transform: isMobile && !isSidebar ? "translateX(-100%)" : "translateX(0)",
    boxShadow: isMobile ? "2px 0 10px rgba(0,0,0,0.2)" : "none",
  };

  // Esconder sidebar completamente no mobile se isSidebar = false.
  if (!isSidebar && isMobile) return null;

  return (
    <Box sx={sidebarStyles}>
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO E ÍCONE DE MENU */}
          <MenuItem
            onClick={() => {
              if (!isMobile) setIsCollapsed(!isCollapsed);
            }}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  <div style={{ textAlign: "center" }}>
                    <img
                      src={dasa3}
                      alt="Logo"
                      style={{
                        width: "60%",
                        height: "60%",
                        margin: "25px 0px",
                      }}
                    />
                  </div>
                </Typography>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Typography
              variant="h5"
              color={colors.grey[300]}
              sx={{ m: "25px 0 10px 20px" }}
            >
              Páginas
            </Typography>

            <Item
              title="Calendário"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
             <Item
              title="Insumos"
              to="/insumos"
              icon={<Inventory2OutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Movimentações"
              to="/movimentacoes"
              icon={<ChangeCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Relatórios"
              to="/relatorios"
              icon={<AssessmentOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Unidades"
              to="/unidades"
              icon={<PinDropIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Solicitações"
              to="/solicitacoes"
              icon={<ShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Suporte"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Configurações"
              to="/configuracoes"
              icon={<SettingsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default Sidebar;
