import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
import calculateDistance from "../utilityFunctions/calculateDistance";
import { useEffect, useRef } from "react";
import "./MapStyles.css";

const createIcon = (color, isClose) => {
    return L.divIcon({
        html: `
            <svg width="25" height="41" viewBox="0 0 25 41" xmlns="http://www.w3.org/2000/svg">
                <path d="M12.5 0C19.4 0 25 5.6 25 12.5C25 24.4 12.5 41 12.5 41C12.5 41 0 24.4 0 12.5C0 5.6 5.6 0 12.5 0Z" fill="${color}" stroke="white" stroke-width="2"/>
                <circle cx="12.5" cy="12.5" r="5" fill="white"/>
            </svg>`,
        iconSize: [25, 48],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        className: `custom-icon ${isClose ? 'animate' : ''}`,
    });
};
    
const LocationMarker = ({ position }) =>
{
    // Hardcoded target location and details
    const targetPosition = [47.6315648, -122.3753728];

    const [latitude, longitude] = position;

    const distanceToTarget = calculateDistance(
        latitude,
        longitude,
        targetPosition[0],
        targetPosition[1]
    );
    console.log(`Distance to target: ${distanceToTarget} km`);

    const isVeryClose = distanceToTarget < 0.05; // < 50 meters
    const markerColor = distanceToTarget < 0.05
        ? "green" // < 50 meters
        : distanceToTarget < 0.1
        ? "yellow" // < 100 meters
        : distanceToTarget < 0.5
        ? "blue" // < 500 meters
        : "red";  // > 500 meters

    const dynamicIcon = createIcon(markerColor, isVeryClose);
    const markerRef = useRef(null);

    // Use a separate useEffect hook to handle the logic
    useEffect(() => {
        if (markerRef.current && isVeryClose) {
            markerRef.current.openPopup();
        }
    }, [isVeryClose, latitude, longitude]);

    return (
        <Marker position={position} icon={dynamicIcon} ref={markerRef}>
            <Popup>
                <div>
                    {isVeryClose ? (
                        <>
                            <strong>Congratulations!</strong>
                            <br />
                            You have arrived!
                        </>
                    ) : markerColor === "green" ? (
                        <>
                            <strong>Great job!</strong>
                            <br />
                            You are very close to the target.
                            <br />
                            Distance to target: {distanceToTarget.toFixed(2)} km
                        </>
                    ) : markerColor === "blue" ? (
                        <>
                            <strong>Keep going!</strong>
                            <br />
                            You are getting closer to the target.
                            <br />
                            Distance to target: {distanceToTarget.toFixed(2)} km
                        </>
                    ) : (
                        <>
                            <strong>Keep moving!</strong>
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
