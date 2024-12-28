import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

function TableRowComponent({ row, onDelete }) {
  const [openConfirm, setOpenConfirm] = useState(false); // State to open/close dialog
  const [selectedId, setSelectedId] = useState(null); // Store the ID of the row to be deleted

  // Handle opening the confirmation dialog
  const handleOpenConfirm = (id) => {
    setSelectedId(id);
    setOpenConfirm(true);
  };

  // Handle closing the confirmation dialog
  const handleCloseConfirm = () => {
    setOpenConfirm(false);
    setSelectedId(null);
  };

  // Handle confirming the deletion
  const handleConfirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
    }
    handleCloseConfirm();
  };

  return (
    <>
      <TableRow>
        <TableCell align="left">{row.username}</TableCell>
        <TableCell align="left">{row.email}</TableCell>
        <TableCell align="center">{row.testId}</TableCell>
        <TableCell align="right">{row.correctAnswersShare}%</TableCell>
        <TableCell align="right">{row.skippedAnswersShare}%</TableCell>
        <TableCell align="right">{row.wrongAnswersShare}%</TableCell>
        <TableCell align="center">
          {new Date(row.createdAt).toLocaleString()}
        </TableCell>
        <TableCell align="right" style={{ width: "50px" }}>
          <IconButton
            edge="end"
            color="error"
            size="small"
            onClick={() => handleOpenConfirm(row._id)}
          >
            <DeleteIcon />
          </IconButton>
        </TableCell>
      </TableRow>

      {/* MUI Dialog for Delete Confirmation */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="delete-dialog-title"
        aria-describedby="delete-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText id="delete-dialog-description">
            Are you sure you want to delete this test result?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="error" autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default TableRowComponent;