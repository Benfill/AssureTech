import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import Clients from "./components/clients/Clients";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./utils/ProtectedRoute";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="container">
          <Routes>
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Clients />} />
            </Route>

            {/* Public Route */}
            <Route path="/auth" element={<AuthPage />} />

            {/* Fallback Route */}
            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
