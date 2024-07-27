import { MapContainer as LeafletMapContainer, TileLayer, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for default styling
import './MapStyles.css'; 
import PropTypes from 'prop-types'; // Import PropTypes for prop validation
import LocationMarker from './LocationMarker'; // LocationMarker component
import L from 'leaflet'; // Leaflet for default icon fixes
import { useState, useEffect} from 'react';

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom hook to center map on position change
const MapCenter = ({ position }) => {
  const map = useMap(); // Access the Leaflet map instance
  
  useEffect(() => {
    if (position) {
      map.setView(position, map.getZoom()); // Update map center to the new position
    }
  }, [position, map]); // Depend on position and map

  return null;
};

MapCenter.propTypes = {
  position: PropTypes.arrayOf(PropTypes.number).isRequired, // Validate that position is an array of numbers
};


const MapContainer = () =>
{
  // State for map center position with default coordinates
  const [position, setPosition] = useState([51.505, -0.09]); 

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords; // Extract latitude and longitude from position object
          setPosition([latitude, longitude]); // Update position state with new coordinates
        },
        (error) => {
          console.error("Error retrieving position:", error); // Error handling
        },
        { enableHighAccuracy: true } // Use high accuracy if possible
      );

      // Cleanup on unmount
      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  return (
    <LeafletMapContainer center={position} zoom={13} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapCenter position={position} />  {/* Render the MapCenter component to adjust map view */}
      <LocationMarker position={position} /> {/* Render the LocationMarker component with the current position */}
    </LeafletMapContainer>
  );
};

export default MapContainer;
