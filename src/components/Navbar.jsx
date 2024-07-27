// import { FaAlignJustify } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { useState } from "react";
import "./navbar.css";

const Navbar = () => {
    const [showMenu, setShowMenu] = useState(false);
    return (
        <nav>
            <Link to="/" className="title">
                Games Afoot
            </Link>
            <div
                className="menu"
                onClick={() => {
                    setShowMenu(!showMenu);
                }}
            >
                <span></span>
                <span></span>
                <span></span>
            </div>

            <ul className={showMenu ? "open" : ""}>
                <li>
                    <NavLink to="/">LogIn</NavLink>
                </li>
                <li>
                    <NavLink to="/aboutus">About Us</NavLink>
                </li>
                <li>
                    <NavLink to="/instruction">How to Play</NavLink>
                </li>
            </ul>
        </nav>
    );
};
export default Navbar;
