import Header from "./components/Header";
import Quiz from "./components/Quiz";
import { Route, Routes } from "react-router-dom"; // Removed BrowserRouter
import Login from "./components/Login";
import Register from "./components/Register";
import UserTable from "./components/UserTable";

function App() {
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="*" element={<Quiz />} />
          <Route path="register" element={<Register />} />
          <Route path="login" element={<Login />} />
          <Route path="results" element={<UserTable />} />
          {/* other routes */}
        </Routes>
      </main>
    </>
  );
}

export default App;
