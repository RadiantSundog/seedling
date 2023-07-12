import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./main_page/MainPage";
import Nav from "./main_page/Nav";
import SignUp from "./accounts/SignupForm";
import LogIn from "./accounts/LoginForm";
import JournalLists from "./journals/JournalLists";
import JournalDetails from "./journals/JournalDetails";
import JournalForm from "./journals/JournalForm";
import GardenLists from "./gardens/GardenLists";
import GardenDetails from "./gardens/GardenDetails";
import GardenForm from "./gardens/GardenForm";

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
          <Route path="gardens">
            <Route path="" element={<GardenLists />} />
            <Route path=":garden_id" element={<GardenDetails />} />
            <Route path="create" element={<GardenForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
