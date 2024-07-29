import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import location from "../assets/position.png";

// Component to render a location marker on the map
const LocationMarker = ({ position }) => {
    if (!position) return null;

    // Define the icon for the marker
    const icon = L.icon({
        iconUrl: location,
        iconSize: [50, 50], // Adjust size as needed
        iconAnchor: [16, 32], // Centered at the bottom
        popupAnchor: [0, -32], // Popup positioned above the icon
    });

    // Destructure latitude and longitude from the position array
    const [latitude, longitude] = position;

    return (
        <Marker position={position} icon={icon}>
            <Popup>
                <div>
                    <strong>Look at you!</strong>
                    <br />
                    Latitude: {latitude.toFixed(6)}
                    <br />
                    Longitude: {longitude.toFixed(6)}
                </div>
            </Popup>
        </Marker>
    );
};

// Define PropTypes for the component
LocationMarker.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired, // Ensure position is provided
};

export default LocationMarker;
