import Home from "./components/Home.jsx";
import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { Route, Routes } from "react-router-dom"; // Removed BrowserRouter
import Login from "./components/Login";
import Register from "./components/Register";
// import UserTable from "./components/UserTable";
import Unauthorized from "./components/Unauthorized";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import ResultsTable from "./components/ResultsTable";
import Tests from "./components/Tests.jsx";
import StartScreen from "./components/StartScreen";

import {
  reactQuestions,
  javascriptQuestions,
  htmlCssQuestions,
} from "./questions.js";

const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <>
      <Header />
      {/* <Nav /> */}
      <main>
        <Routes>
          <Route element={<PersistLogin />}>
            <Route path="test" element={<Quiz />} />
            <Route
              path="/test/react"
              element={<Quiz questions={reactQuestions} />} // React quiz
            />
            <Route
              path="/test/javascript"
              element={<Quiz questions={javascriptQuestions} />} // JavaScript quiz
            />
            <Route
              path="/test/html-css"
              element={<Quiz questions={htmlCssQuestions} />} // HTML & CSS quiz
            />
            <Route path="instructions" element={<StartScreen />} />
            <Route path="home" element={<Home />} />
            <Route path="tests" element={<Tests />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
              <Route path="results" element={<ResultsTable />} />
            </Route>
          </Route>
          {/* other routes */}
        </Routes>
      </main>
    </>
  );
}

export default App;
