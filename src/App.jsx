import "./App.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme.jsx";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom/dist";
import Applyform from "./components/Applyform";
import Register from "./components/Register";
import Home from "./components/Home";
import MyJobs from "./components/MyJobs";
import JobPost from "./components/JobPost";
import { AuthContextProvider } from "./context/AuthContext";
import SeekerLogin from "./components/SeekerLogin";
import ProtectedRoutes from "./routes/ProtectedRoutes";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AuthContextProvider>
          <Router>
          {/* <ProtectedRoutes> */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<SeekerLogin />} />
              <Route path="/job" element={<JobPost />} />
                <Route path="/register" element={<Register />} />
                <Route path="/apply" element={<Applyform />} />
                <Route path="/myjobs" element={<MyJobs />} />
            </Routes>
          {/* </ProtectedRoutes> */}
          </Router>
        </AuthContextProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
