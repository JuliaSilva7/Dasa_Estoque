import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box mb="30px">
      <Typography
        variant="h2"
        color={theme.palette.mode === "dark" ? "#fff" : "#1b1a1a"} // <- muda conforme o modo
        fontWeight="bold"
        sx={{ m: "0 0 5px 0" }}
      >
        {title}
      </Typography>
      <Typography
        variant="h5"
        color={
          theme.palette.mode === "dark" ? colors.greenAccent[400] : "#1b1a1a"
        }
      >
        {subtitle}
      </Typography>
    </Box>
  );
};

export default Header;
