import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import { AuthProvider } from "./context/authContext";
import Clients from "./components/clients/Clients";
import AuthPage from "./pages/auth/AuthPage";
import ProtectedRoute from "./utils/ProtectedRoute";
import { Dashboard } from "./pages/auth/Dashboard";
import Contracts from "./pages/policy/contract/Contracts";
import Claims from "./pages/policy/claim/Claims";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <div className="h-full">
          <Routes>
            {/* Protected Route */}
            <Route element={<ProtectedRoute />}>
              <Route path="/" element={<Clients />} />
              {/* Policy Route */}
              <Route path="/policy/claims" element={<Claims />} />
              <Route path="/policy/contracts" element={<Contracts />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>

            {/* Public Route */}
            <Route path="/auth" element={<AuthPage />} />

            <Route path="/*" element={<h1>Not Found</h1>} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
