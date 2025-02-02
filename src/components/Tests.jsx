import React, { useEffect, useState, useContext } from "react";
import axios from "../api/axios";
import TestCard from "./Card.jsx";
import AuthContext from "../context/AuthProvider";
import reactImg from "../assets/reactJS.png";
import JsImg from "../assets/JavaScript.jpeg";
import HtmlCss from "../assets/HtmlCss.jpg";
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

        if (!accessToken) {
          accessToken = await refreshAccessToken();
        }

        const response = await axios.get(
          `/test-results/completed-tests/${auth.username}`,
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCompletedTests(new Set(response.data));
      } catch (error) {
        console.error("Error fetching completed tests:", error);
      }
    };
 
    if (auth.username) fetchCompletedTests();
  }, [auth.username, auth.accessToken, refreshAccessToken]);

  return (
    <div className="max-w-7xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-6">
        Pick the test you want
      </h1>
      <div className="grid grid-cols-1 text-black sm:grid-cols-2 md:grid-cols-3 gap-6">
        {testData.map((test, index) => (
          <TestCard
            key={index}
            title={test.title}
            image={test.image}
            description={test.description}
            numQuestions={test.numQuestions}
            route={test.route}
            questions={test.questions}
            testId={test.testId}
            isCompleted={completedTests.has(test.testId)}
          />
        ))}
      </div>
    </div>
  );
}
