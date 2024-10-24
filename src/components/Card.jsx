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

export default function TestCard({ title, image, description, numQuestions, route, questions }) {
  const navigate = useNavigate();
  const { setSelectedTest } = useContext(AuthContext); // Access setSelectedTest from context

  const handleCardClick = () => {
    setSelectedTest({ title, questions }); // Set the selected test in context
    navigate(route);
  };

  return (
    <ButtonBase onClick={handleCardClick} sx={{ display: "block", textAlign: "inherit", width: "100%" }}>
      <Card sx={{ maxWidth: 345 }}>
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
      </Card>
    </ButtonBase>
  );
}

