// import Recact from 'react';
import MapContainer from '../components/MapContainer';
import './App.css'; // General styles
import '../components/MapStyles.css'; // Map-specific styles

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">Games Afoot</div>
        <div className="dropdown-menu">
          <select>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
          </select>
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
}

export default App;
