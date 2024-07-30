import { NavLink } from "react-router-dom";
import "./navbar.css";
import { useState, useRef, useEffect } from "react";
import logo1 from "../assets/logo1.png";

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
                <img src={logo1} alt="logo" style={{ width: "40%", height: "auto" }} />
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
                            <NavLink to="/aboutus">About Us</NavLink>
                        </div>
                        <div className="dropdown-item">
                            <NavLink to="/instruction">Instruction</NavLink>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
};
export default Navbar;
