import * as React from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import { useContext } from "react";
import AuthContext from "../context/AuthProvider";

export default function TestCard({ title, image, description, numQuestions, route, questions, testId, isCompleted }) {
  const navigate = useNavigate();
  const { setSelectedTest } = useContext(AuthContext);

  const handleCardClick = () => {
    if (!isCompleted) {
      setSelectedTest({ title, questions, testId });
      navigate(route);
    }
  };

  return (
    <ButtonBase onClick={handleCardClick} sx={{ display: "block", textAlign: "inherit", width: "100%" }} disabled={isCompleted}>
      <Card sx={{ maxWidth: 345, position: "relative" }}>
        <CardHeader
          title={
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6">{title}</Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {numQuestions && `${numQuestions} questions`}
              </Typography>
            </Box>
          }
        />
        <CardMedia component="img" height="194" image={image} alt={title} />
        <CardContent>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {description}
          </Typography>
        </CardContent>

        {/* Overlay for completed tests */}
        {isCompleted && (
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(0, 0, 0, 0.9)", // 90% transparent black
              color: "#ffffff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              textAlign: "center",
              p: 2,
              zIndex: 1,
            }}
          >
            <Typography variant="h6">Results for {testId} submitted</Typography>
          </Box>
        )}
      </Card>
    </ButtonBase>
  );
}
