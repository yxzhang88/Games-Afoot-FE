export default function calculateDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of the earth in km

    // Convert latitude and longitude differences from degrees to radians
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    
    // Apply Haversine formula
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    // Calculate the central angle and distance
    const c = 2 * Math.asin(Math.sqrt(a));
    // Distance in kilometers
    return R * c;
}
