import { useState, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom"; 
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import Team from "./scenes/team";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Form from "./scenes/form";
import FAQ from "./scenes/faq";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";
import Configuracoes from "./scenes/configuracoes";
import Solicitacoes from "./scenes/solicitacoes";
import Insumos from "./scenes/insumos";
import Unidades from "./scenes/unidades";
import Movimentacoes from "./scenes/movimentacoes";
import Relatorios from "./scenes/relatorios";
import Login from "./scenes/login";
import ChatBot from "./scenes/chatbot";



// Componente de rota protegida
const PrivateRoute = ({ children }) => {
  const { user } = useContext(AuthContext);
  return user ? children : <Navigate to="/login" />;
};


function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const { user } = useContext(AuthContext);
  const location = useLocation();
  const [isChatOpen, setIsChatOpen] = useState(false);


  // Verifica se está em uma rota pública
  const isPublicRoute =
    location.pathname === "/" ||
    location.pathname === "/login"

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthProvider>
          <div className="app" style={{ display: "flex", height: "100vh" }}>
            {/* Sidebar só visível se não for rota pública e usuário estiver logado */}
            {!isPublicRoute && user && (!isMobile || isSidebar) && (
              <Sidebar isSidebar={isSidebar} isMobile={isMobile} />
            )}

            <main className="content" style={{ flex: 1, overflow: "auto" }}>
              {/* Topbar só visível se não for rota pública e usuário estiver logado */}
              {!isPublicRoute && user && <Topbar setIsSidebar={setIsSidebar} />}

              <Routes>
                {/* Rotas públicas */}
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
             

                {/* Rotas privadas (protegidas por login) */}
                <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
                <Route path="/team" element={<PrivateRoute><Team /></PrivateRoute>} />
                <Route path="/contacts" element={<PrivateRoute><Contacts /></PrivateRoute>} />
                <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
                <Route path="/form" element={<PrivateRoute><Form /></PrivateRoute>} />
                <Route path="/faq" element={<PrivateRoute><FAQ /></PrivateRoute>} />
                <Route path="/calendar" element={<PrivateRoute><Calendar /></PrivateRoute>} />
                <Route path="/configuracoes" element={<PrivateRoute><Configuracoes /></PrivateRoute>} />
                <Route path="/solicitacoes" element={<PrivateRoute><Solicitacoes /></PrivateRoute>} />
                <Route path="/movimentacoes" element={<PrivateRoute><Movimentacoes /></PrivateRoute>} />
                <Route path="/insumos" element={<PrivateRoute><Insumos /></PrivateRoute>} />
                <Route path="/unidades" element={<PrivateRoute><Unidades /></PrivateRoute>} />
                <Route path="/relatorios" element={<PrivateRoute><Relatorios /></PrivateRoute>} />
                <Route path="/chatbot" element={<PrivateRoute><ChatBot /></PrivateRoute>} />
              </Routes>
            </main>
          </div>
        </AuthProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;