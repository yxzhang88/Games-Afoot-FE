import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import location from "../assets/position.png";
import calculateDistance from "../utilityFunctions/calculateDistance";
import { useEffect, useRef } from "react";

// Component to render a location marker on the map
const LocationMarker = ({ position }) => {
    // Move the conditional check for position outside of the component
    if (!position) return null;

    // Define the icon for the marker
    const icon = L.icon({
        iconUrl: location,
        iconSize: [50, 50], // Adjust size as needed
        iconAnchor: [16, 32], // Centered at the bottom
        popupAnchor: [0, -32], // Popup positioned above the icon
    });

    // Hardcoded target location and details
    const targetPosition = [47.636719, -122.366706]; 
    // test -122.371000
    const targetName = "Test Spot";
    const targetDetails = "This is a detailed description of the target spot.";
 
    // Destructure latitude and longitude from the position array
    const [latitude, longitude] = position;

    const isCloseToTarget = calculateDistance(latitude, longitude, targetPosition[0], targetPosition[1]) < 0.1;

    const markerRef = useRef(null);

    // Use a separate useEffect hook to handle the logic
    useEffect(() => {
        if (markerRef.current && isCloseToTarget) {
            markerRef.current.openPopup();
        }
    }, [isCloseToTarget, latitude, longitude]);

    return (
        <Marker position={position} icon={icon} ref={markerRef}>
            <Popup>
                <div>
                    {isCloseToTarget ? (
                        <>
                            <strong>Congratulation! You have reached:</strong>
                            <br />
                            Target Name: {targetName}
                            <br />
                            Description: {targetDetails}
                        </>
                    ) : (
                        <>
                            <strong>Look at you!</strong>
                            <br />
                            Latitude: {latitude.toFixed(6)}
                            <br />
                            Longitude: {longitude.toFixed(6)}
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

// Define PropTypes for the component
LocationMarker.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default LocationMarker;
