import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./main_page/MainPage";
import Nav from "./main_page/Nav";
import SignUp from "./accounts/SignupForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="accounts">
            <Route path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
