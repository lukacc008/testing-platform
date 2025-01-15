import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingIndicator() {
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <CircularProgress size={50} sx={{ color: "white" }} />
      <p>Loading results table...</p>
    </Box>
  );
}

export default LoadingIndicator;