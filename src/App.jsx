import Header from "./components/Header";
import Quiz from "./components/Quiz";

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Quiz /> */}
      <Routes>
        <Route path="/" element={<Quiz />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* other routes */}
      </Routes>
      </main>
    </>
  );
}

export default App;
