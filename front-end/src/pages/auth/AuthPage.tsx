import React, { useEffect, useState } from "react";
import LoginForm from "../../components/auth/LoginForm";
import RegisterForm from "../../components/auth/RegisterForm";
import { useAuth } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";
import { Alert } from "@mui/material";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isAuthenticated } = useAuth();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const timeRef = setTimeout(() => {
      setError("");
      setSuccess("");
    }, 3000);

    return () => {
      clearTimeout(timeRef);
    };
  }, [success, error]);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    navigate("/"); // Redirect to the home page after login
  };

  const handleRegister = async (
    name: string,
    email: string,
    password: string
  ) => {
    await register(name, email, password);
    setIsLogin(true);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {success && <Alert severity="success">{success}</Alert>}
      {error && <Alert severity="error">{error}</Alert>}
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center  p-8">
          {isLogin ? (
            <LoginForm
              switchToRegister={() => setIsLogin(false)}
              onLogin={handleLogin}
              setError={setError}
              setSuccess={setSuccess}
            />
          ) : (
            <RegisterForm
              switchToLogin={() => setIsLogin(true)}
              onRegister={handleRegister}
              setError={setError}
              setSuccess={setSuccess}
            />
          )}
        </div>
        <div
          className="hidden lg:block lg:w-1/2 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://autohub.ma/wp-content/uploads/2024/07/assurance-auto-1024x683.jpeg')",
          }}
        >
          <div className="h-full bg-transparent bg-opacity-50 flex items-center justify-center">
            <div className="text-center text-black bg-white rounded bg-opacity-5 px-12">
              <h2 className="text-4xl font-bold mb-6">Your Title</h2>
              <p className="text-xl">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Facilis, expedita.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
