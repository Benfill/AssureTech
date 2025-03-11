import { NavLink } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Header = () => {
  const { isAuthenticated, isAdmin, logout } = useAuth();
  return (
    <div className="w-full h-full bg-black px-10 flex justify-center items-center">
      <header className="w-1/2 h-[50px] py-8 px-20 flex justify-between items-center rounded-full text-white">
        <h4 className="text-xl font-semibold">AssureTech</h4>
        <nav className="flex items-center gap-4">
          <NavLink
            to="/"
            className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
          >
            Home
          </NavLink>
          <NavLink
            to="/policy/contracts"
            className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
          >
            Contracts 
          </NavLink>
          <NavLink
            to="/policy/claims"
            className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
          >
            Claims 
          </NavLink>
          <NavLink
            to="/about"
            className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
          >
            About
          </NavLink>
          <NavLink
            to="/faq"
            className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
          >
            FAQ
          </NavLink>

          {isAuthenticated ? (
            <>
              {isAdmin && (
                <NavLink
                  to="/dashboard"
                  className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
                >
                  Dashboard
                </NavLink>
              )}
              <button
                onClick={logout}
                className="text-white text-base font-medium transition-all cursor-pointer duration-300 ease-in-out hover:text-main"
              >
                Logout
              </button>
            </>
          ) : (
            <NavLink
              to="/auth"
              className="text-white text-base font-medium transition-all duration-300 ease-in-out hover:text-main"
            >
              LogIn
            </NavLink>
          )}
        </nav>
      </header>
    </div>
  );
};

export default Header;
