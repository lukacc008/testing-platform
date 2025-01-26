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
  const { auth, setAuth, userLoggedIn, setUserLoggedIn, userReady } = useAuth(); // Add userReady to destructured context
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
    <header className="flex justify-between items-center p-4 relative border-b-2 border-white box-border">
  {/* Conditionally render nav links based on userReady */}
  {!userReady && (
    <nav>
      <ul className="flex gap-6"> {/* Increased gap between items */}
        {isAdmin && (
          <li>
            <Link
              to="/results"
              className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
            >
              Results
            </Link>
          </li>
        )}
        {userLoggedIn && (
          <li>
            <Link
              to="/tests"
              className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
            >
              Tests
            </Link>
          </li>
        )}
        <li>
          <Link
            to="/home"
            className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
          >
            Home
          </Link>
        </li>
        {!userLoggedIn ? (
          <>
            <li>
              <Link
                to="/login"
                className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
              >
                Sign in
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
              >
                Register
              </Link>
            </li>
          </>
        ) : (
          <li>
            <button
              onClick={handleOpenConfirm}
              className="text-white hover:text-blue-500 text-lg font-medium bg-transparent border-0 p-0 m-0" /* Increased font size */
            >
              Logout
            </button>
          </li>
        )}
      </ul>
    </nav>
  )}

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
      <Button
        onClick={handleConfirmLogout}
        color="primary"
        autoFocus
        className="text-white hover:text-blue-500 text-lg font-medium" /* Increased font size */
      >
        Logout
      </Button>
    </DialogActions>
  </Dialog>
</header>

  );
}
