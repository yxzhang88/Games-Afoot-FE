// utils/getDynamicIcon.js

import L from "leaflet";

const getDynamicIcon = (distance) => {
    let color;
    if (distance < 0.1) {
        color = "purple";
    } else if (distance < 0.5) {
        color = "yellow";
    } else {
        color = "red";
    }

    const iconUrl = `data:image/svg+xml;base64,${btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="50" height="50" fill="${color}">
            <circle cx="12" cy="12" r="10"/>
        </svg>
    `)}`;

    return L.icon({
        iconUrl,
        iconSize: [30, 30],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
    });
};

export default getDynamicIcon;
