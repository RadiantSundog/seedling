import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import MainPage from "./main_page/MainPage";
import Nav from "./main_page/Nav";
import SignUp from "./accounts/SignupForm";
import LogIn from "./accounts/LoginForm";
import JournalLists from "./journals/JournalLists";
import JournalDetails from "./journals/JournalDetails";
import JournalForm from "./journals/JournalForm";
import { AuthProvider } from "@galvanize-inc/jwtdown-for-react";
import GardenLists from "./gardens/GardenLists";
import GardenDetails from "./gardens/GardenDetails";
import GardenForm from "./gardens/GardenForm";
import PlantLists from "./plants/PlantLists";
import PlantForm from "./plants/PlantForm";
import PlantDetails from "./plants/PlantDetails";
import TaskLists from "./gardens/TaskLists";
import TaskForm from "./gardens/TaskForm";
import TaskDetails from "./gardens/TaskDetails";

function App() {
  return (
    <BrowserRouter>
      <Nav />
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
        <Route path="plants">
          <Route path="" element={<PlantLists />} />
          <Route path=":plant_id" element={<PlantDetails />} />
          <Route path="create" element={<PlantForm />} />
        </Route>
        <Route path="tasks">
          <Route path="" element={<TaskLists />} />
          <Route path=":task_id" element={<TaskDetails />} />
          <Route path="create" element={<TaskForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
