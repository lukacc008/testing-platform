import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

function ToolbarComponent() {
  return (
    <Toolbar>
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        User Data Table
      </Typography>
      <Tooltip title="Filter list">
        <IconButton>{/* Add filter icon if needed */}</IconButton>
      </Tooltip>
    </Toolbar>
  );
}

export default ToolbarComponent;