import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import Login from "./pages/Login/LoginPage";
import PaymentsPage from "./pages/PaymentsPage/PaymentsPage";
import ProtectedRoute from "./utils/ProtectedRoute";

function App() {
  return (
    <Router>
      <div className="pageLayout">
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <PaymentsPage />
              </ProtectedRoute>
            }
            // exact
          />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
