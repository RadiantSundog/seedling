import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./MainPage";
import Nav from "./Nav";
import Signup from "./SignupForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="accounts">
            <Route path="signup" element={<Signup />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
