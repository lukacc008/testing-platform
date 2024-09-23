import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Card from './Card';
import reactImg from '../assets/reactJS.png';
import JsImg from '../assets/JavaScript.jpeg';
import HtmlCss from '../assets/HtmlCss.png';
import questions from '../questions.js';

const reactNumQuestions = questions.length;

// Sample test data (title, image, description)
const testData = [
  {
    title: "React Test",
    image: reactImg,
    description: "Take a 5-10 minutes React JS test.",
    numQuestions: reactNumQuestions
  },
  {
    title: "JavaScript Test",
    image: JsImg,
    description: "Take a quick JavaScript assessment.",
  },
  {
    title: "HTML & CSS Test",
    image: HtmlCss,
    description: "Test your HTML and CSS skills.",
  },
  // Add more tests as needed
];

export default function Home() {
  return (
    <Container sx={{ mt: 4 }}>
      {/* Title */}
      <Typography variant="h4" component="h1" gutterBottom>
        Pick the test you want
      </Typography>

      {/* Grid Layout */}
      <Grid container spacing={4}>
        {testData.map((test, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            {/* Render the card with test data */}
            <Card 
              title={test.title} 
              image={test.image} 
              description={test.description}
              numQuestions={test.numQuestions}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
