import LinearProgress from "@mui/material/LinearProgress";
import Box from "@mui/material/Box";

function LoadingIndicator() {
  return (
    <Box sx={{ width: "100%", mt: -3.5 }}>
      <LinearProgress color="success"/>
      <p style={{ textAlign: "center", marginTop: "8px" }}>Loading results table...</p>
    </Box>
  );
}

export default LoadingIndicator;
