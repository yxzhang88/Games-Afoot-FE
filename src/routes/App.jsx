// import Recact from 'react';
import MapContainer from "../components/MapContainer";
import ProgressWindow from '../components/Progress';
import "./App.css"; // General styles
import "../components/MapStyles.css"; // Map-specific styles
import { useState, useRef, useEffect } from "react";

const App = () => {
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

    // Manage the state and data here
    const [currentSpot] = useState(1);
    const totalSpots = 3;
    const userLocation = {
        latitude: 37.631565,
        longitude: -122.375373
    };
    const [hint, setHint] = useState("Look near the big oak tree.");
    const distance = "5 km";
    
    const checkLocation = () => {
        console.log('Checking location...');
    };

    const getMoreHints = () => {
        setHint("The spot is near a historical marker.");
    };
    

    return (
        <div className="app-container">
            <header className="header">
                <div className="logo">
                    <h2>Games Afoot</h2>
                </div>
                <div className="menu">
                    <button onClick={toggleDropdown} className="menu-button">
                        ☰
                    </button>
                    {dropdownOpen && (
                        <div className="dropdown-menu" ref={dropdownRef}>
                            <div className="dropdown-item">Home</div>
                            <div className="dropdown-item">Account</div>
                            <div className="dropdown-item">Logout</div>
                        </div>
                    )}
                </div>
            </header>
            <div className="content">
                <div className="other-content">
                    <div className="user-input">
                        user input
                    </div>
                    <div className="progress-tracking">
                        <ProgressWindow
                            currentSpot={currentSpot}
                            totalSpots={totalSpots}
                            userLocation={userLocation}
                            checkLocation={checkLocation}
                            distance={distance}
                            hint={hint}
                            getMoreHints={getMoreHints}/>
                    </div>
                </div>
                <div className="map-container">
                    <MapContainer />
                </div>
            </div>
        </div>
    );
};

export default App;
