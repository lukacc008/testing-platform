//////////////////////// RENAME IT LATER TO TESTS NOT HOME ////////////////////////

import * as React from "react";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TestCard from "./Card";
import reactImg from "../assets/reactJS.png";
import JsImg from "../assets/JavaScript.jpeg";
import HtmlCss from "../assets/HtmlCss.png";
// Import the named exports from questions.js
import {
  reactQuestions,
  javascriptQuestions,
  htmlCssQuestions,
} from "../questions.js";

// Get the number of questions from each test
const reactNumQuestions = reactQuestions.length;
const jsNumQuestions = javascriptQuestions.length;
const htmlCssNumQuestions = htmlCssQuestions.length;

// Sample test data (title, image, description)
const testData = [
  {
    title: "React Test",
    image: reactImg,
    description: "Take a 5-10 minutes React JS test.",
    route: "/test/react",
    numQuestions: reactNumQuestions,
    questions: reactQuestions,
  },
  {
    title: "JavaScript Test",
    image: JsImg,
    description: "Take a quick JavaScript assessment.",
    route: "/test/javascript",
    numQuestions: jsNumQuestions,
    questions: javascriptQuestions,
  },
  {
    title: "HTML & CSS Test",
    image: HtmlCss,
    description: "Test your HTML and CSS skills.",
    route: "/test/html-css",
    numQuestions: htmlCssNumQuestions,
    questions: htmlCssQuestions
  },
];

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pick the test you want
      </Typography>
      <Grid container spacing={4}>
        {testData.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TestCard
              title={test.title}
              image={test.image}
              description={test.description}
              numQuestions={test.numQuestions}
              route={test.route} // Pass route as a prop to TestCard
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
