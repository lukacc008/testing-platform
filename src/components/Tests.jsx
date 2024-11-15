import * as React from "react";
import { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import TestCard from "./Card.jsx";
import AuthContext from "../context/AuthProvider";
import reactImg from "../assets/reactJS.png";
import JsImg from "../assets/JavaScript.jpeg";
import HtmlCss from "../assets/HtmlCss.png";
import { reactQuestions, javascriptQuestions, htmlCssQuestions } from "../questions.js";

const reactNumQuestions = reactQuestions.length;
const jsNumQuestions = javascriptQuestions.length;
const htmlCssNumQuestions = htmlCssQuestions.length;

const testData = [
  {
    title: "React Test",
    testId: "react",
    image: reactImg,
    description: "Take a 5-10 minutes React JS test.",
    route: "/test/react",
    numQuestions: reactNumQuestions,
    questions: reactQuestions,
  },
  {
    title: "JavaScript Test",
    testId: "javascript",
    image: JsImg,
    description: "Take a quick JavaScript assessment.",
    route: "/test/javascript",
    numQuestions: jsNumQuestions,
    questions: javascriptQuestions,
  },
  {
    title: "HTML & CSS Test",
    testId: "html-css",
    image: HtmlCss,
    description: "Test your HTML and CSS skills.",
    route: "/test/html-css",
    numQuestions: htmlCssNumQuestions,
    questions: htmlCssQuestions,
  },
];

export default function Tests() {
  const { auth, refreshAccessToken } = useContext(AuthContext);
  const [completedTests, setCompletedTests] = useState(new Set());

  useEffect(() => {
    const fetchCompletedTests = async () => {
      try {
        let accessToken = auth.accessToken;
        
        // If accessToken is missing, try refreshing it
        if (!accessToken) {
          accessToken = await refreshAccessToken();
        }
        
        const response = await axios.get(`/test-results/completed-tests/${auth.username}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
        setCompletedTests(new Set(response.data));
      } catch (error) {
        console.error("Error fetching completed tests:", error);
      }
    };

    if (auth.username) fetchCompletedTests();
  }, [auth.username, auth.accessToken, refreshAccessToken]);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Pick the test you want
      </Typography>
      <Grid container spacing={8}>
        {testData.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <TestCard
              title={test.title}
              image={test.image}
              description={test.description}
              numQuestions={test.numQuestions}
              route={test.route}
              questions={test.questions}
              testId={test.testId}
              isCompleted={completedTests.has(test.testId)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
