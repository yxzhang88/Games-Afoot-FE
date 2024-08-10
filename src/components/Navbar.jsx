import { NavLink } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import logo1 from "../assets/logo1.png";
import "./Navbar.css";

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    const handleClickOutside = (event) => {
        if (
            dropdownRef.current &&
            !dropdownRef.current.contains(event.target)
        ) {
            setDropdownOpen(false);
        }
    };

    useEffect(() => {
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="header">
            <div className="logo">
                <img
                    src={logo1}
                    alt="logo"
                    style={{ width: "50%", height: "auto" }}
                />
            </div>
            <div className="menu">
                <button onClick={toggleDropdown} className="menu-button">
                    ☰
                </button>
                {dropdownOpen && (
                    <div className="dropdown-menu" ref={dropdownRef}>
                        <div className="dropdown-item">
                            <NavLink to="/">Games</NavLink>
                        </div>
                        <div className="dropdown-item">
                            <NavLink to="/aboutgame">About Game</NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Navbar;
