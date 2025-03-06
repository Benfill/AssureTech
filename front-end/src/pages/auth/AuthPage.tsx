import React, { useState } from "react";
import LoginForm from "../../components/auth/login/LoginForm";
import RegisterForm from "../../components/auth/register/RegisterForm";
import { useAuth } from "../../context/authContext";
import { Navigate, useNavigate } from "react-router-dom";

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, register, isAuthenticated } = useAuth();
  const navigate = useNavigate();

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
    navigate("/"); // Redirect to the home page after registration
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="min-h-screen flex">
        <div className="w-full lg:w-1/2 flex items-center justify-center  p-8">
          {isLogin ? (
            <LoginForm
              switchToRegister={() => setIsLogin(false)}
              onLogin={handleLogin}
            />
          ) : (
            <RegisterForm
              switchToLogin={() => setIsLogin(true)}
              onRegister={handleRegister}
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
