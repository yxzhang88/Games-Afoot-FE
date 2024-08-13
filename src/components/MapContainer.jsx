import {
    MapContainer as LeafletMapContainer,
    TileLayer,
    useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./MapStyles.css";
import PropTypes from "prop-types";
import LocationMarker from "./LocationMarker";
import L from "leaflet";
import { useState, useEffect, useCallback } from "react";
import ScrollButton from "./ScrollButton";

// Fix default icon issues
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl:
        "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
    iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapCenter = ({ position }) => {
    const map = useMap();

    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom());
        }
    }, [position, map]);

    return null;
};

MapCenter.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const LocationButton = ({ onClick }) => (
    <button onClick={onClick} className="location-button">
        Update Location
    </button>
);

LocationButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

const MapContainer = ({ currentLocation, updateLocation, distanceToTarget }) => {
    const [position, setPosition] = useState([47.636719, -122.366806]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (currentLocation) {
            setPosition(currentLocation);
        }
    }, [currentLocation]);

    useEffect(() => {
        if (navigator.geolocation) {
            const getLocation = () => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords;
                        const newPosition = [latitude, longitude];
                        console.log("Initial Load - Current Position:", newPosition);
                        setPosition(newPosition);
                        updateLocation(newPosition);
                        setInitialLoad(false); // Prevent further initial load calls
                    },
                    (error) => {
                        console.error("Error retrieving position:", error);
                    },
                    { enableHighAccuracy: true }
                );
            };
            if (initialLoad) {
                getLocation();
                setInitialLoad(false);
            }
        } else {
            console.error("Geolocation not supported by this browser.");
        }
    }, [updateLocation, initialLoad]);

    const handleLocationButtonClick = useCallback(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPosition = [latitude, longitude];
                    console.log("Center Button Clicked - Current Position:", newPosition);
                    setPosition(newPosition);
                    updateLocation(newPosition);
                },
                (error) => {
                    console.error("Error retrieving position:", error);
                },
                { enableHighAccuracy: true }
            );
        } else {
            console.error("Geolocation not supported by this browser.");
        }
    }, [updateLocation]);

    return (
        <div className="map">
            <div className="map-container">
                <LeafletMapContainer
                    center={position}
                    zoom={13}
                    style={{ height: "100vh", width: "100%" }}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    />
                    <MapCenter position={position} />{" "}
                    <LocationMarker position={position} distanceToTarget={distanceToTarget}  />{" "}
                    <div className="scroll-button">
                        <ScrollButton />
                    </div>
                    <div className="map-controls">
                        <LocationButton onClick={handleLocationButtonClick} />
                    </div>
                </LeafletMapContainer>
            </div>
        </div>
    );
};

MapContainer.propTypes = {
    updateLocation: PropTypes.func.isRequired,
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    distanceToTarget: PropTypes.number.isRequired,
};

export default MapContainer;
