import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

export default function Header() {
  const { auth, setAuth, userLoggedIn, setUserLoggedIn } = useAuth(); // Get the auth state
  const isAdmin = auth?.roles?.includes(5150); // Check if the user is an Admin
  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false); // State to open/close dialog

  const handleLogoutClick = async () => {
    try {
      // Call the backend to handle logout using GET instead of POST
      const response = await fetch("/logout", {
        method: "GET",
        credentials: "include",
      });

      if (response.ok) {
        setAuth({ username: "", email: "", roles: [], accessToken: "" });
        setUserLoggedIn(false);
        navigate("/login");
      }
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleConfirmLogout = () => {
    setOpenConfirm(false);
    handleLogoutClick();
  };

  return (
    <header>
      <nav>
        <ul>
          {isAdmin && (
            <li>
              <Link to="/results">Results</Link>
            </li>
          )}
          {userLoggedIn && (
            <li>
              <Link to="/tests">Tests</Link>
            </li>
          )}
          <li>
            <Link to="/home">Home</Link>
          </li>
          {!userLoggedIn ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button onClick={handleOpenConfirm}>Logout</button>
            </li>
          )}
        </ul>
      </nav>

      {/* MUI Dialog for Logout Confirmation */}
      <Dialog
        open={openConfirm}
        onClose={handleCloseConfirm}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <DialogContentText id="logout-dialog-description">
            Are you sure you want to logout?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseConfirm} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmLogout} color="primary" autoFocus>
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </header>
  );
}
