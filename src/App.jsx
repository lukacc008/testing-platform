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
import Home from "./components/Home";
import StartScreen from "./components/StartScreen";

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
            <Route path="quiz" element={<Quiz />} />
            <Route path="test" element={<StartScreen />} />
            <Route path="home" element={<Home />} />
            <Route path="quiz" element={<Quiz />} />
            <Route path="unauthorized" element={<Unauthorized />} />
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            {/* <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="results" element={<UserTable />} />
          </Route> */}
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
