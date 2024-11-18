import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function LoadingIndicator() {
  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      <CircularProgress />
    </Box>
  );
}

export default LoadingIndicator;