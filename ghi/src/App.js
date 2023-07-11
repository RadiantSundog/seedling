import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./main_page/MainPage";
import Nav from "./main_page/Nav";
import SignUp from "./accounts/SignupForm";
import LogIn from "./accounts/LoginForm";
import JournalLists from "./journals/JournalLists";
import JournalDetails from "./journals/JournalDetails";
import JournalForm from "./journals/JournalForm";

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="accounts">
            <Route path="signup" element={<SignUp />} />
            <Route path="login" element={<LogIn />} />
          </Route>
          <Route path="journals">
            <Route path="" element={<JournalLists />} />
            <Route path=":journal_id" element={<JournalDetails />} />
            <Route path="create" element={<JournalForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
