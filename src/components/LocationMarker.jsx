import { Marker, Popup } from "react-leaflet";
import PropTypes from "prop-types";
import L from "leaflet";
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
        className: `custom-icon ${isClose ? "animate" : ""}`,
    });
};

const LocationMarker = ({ position, distanceToTarget, gameStarted }) =>
{
    console.log("Received distanceToTarget:", distanceToTarget);
    const isVeryClose = distanceToTarget < 0.05; // < 50 meters
    const markerColor =
        distanceToTarget < 0.05
            ? "green" // < 50 meters
            : distanceToTarget < 0.1
            ? "yellow" // < 100 meters
            : distanceToTarget < 0.5
            ? "blue" // < 500 meters
            : "red"; // > 500 meters

    const dynamicIcon = createIcon(markerColor, isVeryClose);
    const markerRef = useRef(null);

    useEffect(() => {
        if (markerRef.current) {
            markerRef.current.setLatLng(position);
        }
    }, [position]);

    useEffect(() => {
        if (markerRef.current && isVeryClose) {
            markerRef.current.openPopup();
        }
    }, [isVeryClose]);

    if (!gameStarted) {
        return (
            <Marker position={position} icon={createIcon("grey", false)}>
                <Popup>
                    <strong>Game not started yet</strong>
                </Popup>
            </Marker>
        );
    }
    return (
        <Marker position={position} icon={dynamicIcon} ref={markerRef}>
            <Popup>
                <div>
                    {isVeryClose ? (
                        <>
                            <strong>Congratulations!</strong>
                            <br />
                            You’ve reached your destination!
                        </>
                    ) : markerColor === "green" ? (
                        <>
                            <strong>Almost there! </strong>
                            <br />
                            Just a few steps away from the target!
                            <br />
                            Distance to target: {distanceToTarget.toFixed(2)} km
                        </>
                    ) : markerColor === "blue" ? (
                        <>
                            <strong>Great job! </strong>
                            <br />
                            You are getting closer to the target!
                            <br />
                            Distance to target: {distanceToTarget.toFixed(2)} km
                        </>
                    ) : (
                        <>
                            <strong>Keep going! </strong>
                            <br />
                            You’re still far from the goal. Keep going and make some progress!
                            <br />
                            Distance to target: {distanceToTarget.toFixed(2)} km
                        </>
                    )}
                </div>
            </Popup>
        </Marker>
    );
};

LocationMarker.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    distanceToTarget: PropTypes.number,
    gameStarted: PropTypes.bool.isRequired,
};

export default LocationMarker;
