// import Recact from 'react';
import MapContainer from '../components/MapContainer';
import './App.css'; // General styles
import '../components/MapStyles.css'; // Map-specific styles
import { useState, useRef, useEffect } from 'react';

const App = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <div className="logo"><h2>Games Afoot</h2></div>
        <div className="menu">
        <button onClick={toggleDropdown} className="menu-button">☰</button>
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
          Other Content
        </div>
        <div className="map-container">
          <MapContainer />
        </div>
      </div>
    </div>
  );
};

export default App;
