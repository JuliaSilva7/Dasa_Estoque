import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { tokens } from "../theme";
import ProgressCircle from "./ProgressCircle";

const StatBox = ({
  title,
  subtitle,
  icon,
  progress,
  increase,
  titleFontSize = "18px",
  subtitleFontSize = "16px",
  increaseFontSize = "14px",
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const isMobile = useMediaQuery(theme.breakpoints.down("sm")); // abaixo de 600px
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md")); // entre 600px e 900px

  // Responsividade dinâmica
  const responsiveTitleFontSize = isMobile
    ? "12px"
    : isTablet
    ? "14px"
    : titleFontSize;
  const responsiveSubtitleFontSize = isMobile
    ? "12px"
    : isTablet
    ? "14px"
    : subtitleFontSize;
  const responsiveIncreaseFontSize = isMobile
    ? "11px"
    : isTablet
    ? "13px"
    : increaseFontSize;
  const responsiveMargin = isMobile ? "0 10px" : "0 30px";

  return (
    <Box width="100%" m={responsiveMargin}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        flexDirection={isMobile ? "column" : "row"}
        gap={isMobile ? 1 : 0}
      >
        <Box display="flex" flexDirection="column" alignItems={isMobile ? "center" : "flex-start"}>
          {icon}
          <Typography
            variant="h4"
            fontWeight="bold"
            sx={{
              color: colors.greenAccent[200],
              fontSize: responsiveTitleFontSize,
              textAlign: isMobile ? "center" : "left",
            }}
          >
            {title}
          </Typography>
        </Box>
        <Box>
          <ProgressCircle progress={progress} />
        </Box>
      </Box>

      <Box
        display="flex"
        justifyContent="space-between"
        mt="4px"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "center" : "flex-start"}
        gap={isMobile ? 0.5 : 0}
      >
        <Typography
          variant="h5"
          sx={{
            color: colors.greenAccent[200],
            fontSize: responsiveSubtitleFontSize,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          {subtitle}
        </Typography>
        <Typography
          variant="h5"
          fontStyle="italic"
          sx={{
            color: colors.greenAccent[200],
            fontSize: responsiveIncreaseFontSize,
            textAlign: isMobile ? "center" : "right",
          }}
        >
          {increase}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatBox;
