import { NavLink } from "react-router-dom";

const Header = () => {
    return (  
        <div className="header">
            <header>
                <h4>AssureTech</h4>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/policies">Policies</NavLink>
                    <NavLink to="/about">About</NavLink>
                    <NavLink to="/faq">FAQ</NavLink>
                    <NavLink to="/login">LogIn</NavLink>
                </nav>
            </header>
        </div>
    );
}
 
export default Header;