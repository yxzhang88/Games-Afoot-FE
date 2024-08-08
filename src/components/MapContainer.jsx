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
import { useState, useEffect } from "react";
import InstructionPopUp from "./InstructionPopUp";

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

const MapContainer = ({ updateLocation }) => {
    const [position, setPosition] = useState([47.636719, -122.366806]);
    const [initialLoad, setInitialLoad] = useState(true);

    useEffect(() => {
        if (navigator.geolocation) {
            const getLocation = () => {
                navigator.geolocation.getCurrentPosition(
                    (pos) => {
                        const { latitude, longitude } = pos.coords; 
                        const newPosition = [latitude, longitude];
                        setPosition(newPosition); 
                        updateLocation(newPosition); 
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

    return (
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
            <LocationMarker position={position} />{" "}
            <div className="instruction-icon">
                <InstructionPopUp />
            </div>
        </LeafletMapContainer>
    );
};

MapContainer.propTypes = {
    updateLocation: PropTypes.func.isRequired, 
};

export default MapContainer;
