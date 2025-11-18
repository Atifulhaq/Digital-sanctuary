import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import Questionnaire from "./pages/Questionnaire";
import Report from "./pages/Report";
import ProtectedRoute from "./components/ProtectedRoute";
import NavBar from "./components/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* Dashboard (after login) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Questionnaire page */}
        <Route
          path="/questionnaire"
          element={
            <ProtectedRoute>
              <Questionnaire />
            </ProtectedRoute>
          }
        />

        {/* Report */}
        <Route 
          path="/report/:id" 
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;