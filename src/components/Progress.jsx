import PropTypes from "prop-types";
import { useEffect } from "react";

const Progress = ({ firstClue, currentLocation, gameStarted, updateLocation }) =>
{
    useEffect(() => {
        console.log("Progress component received new currentLocation:", currentLocation);
    }, [currentLocation]);

    const handleCheckLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    const newLocation = [latitude, longitude];
                    console.log("Current position:", newLocation);

                    // Hardcoded location for testing purposes
                    const hardcodedLocation = [23.1317, 113.2663]; // Example coordinates
                    console.log("Hardcoded location:", hardcodedLocation);

                    // Check if the new location is different from the current location
                    if (
                        newLocation[0] !== currentLocation[0] ||
                        newLocation[1] !== currentLocation[1]
                    )
                    {
                        console.log("Location has changed. Updating location with hardcoded values.");
                        updateLocation(hardcodedLocation);
                    } else
                    {
                        console.log("Location has not changed. No update needed.");
                    }
                },
                (error) => {
                    console.error("Error getting geolocation: ", error);
                }
            ); 
        } else {
            console.error("Geolocation is not supported by this browser.");
        }
    };

    console.log("CurrentLocation in Progress:", currentLocation);

    // const handleCheckLocation = () =>
    // {
    //     if (navigator.geolocation)
    //     {
    //         navigator.geolocation.getCurrentPosition((position) =>
    //         {
    //             const { latitude, longitude } = position.coords;
    //             updateLocation([latitude, longitude])
    //         },
    //             (error) =>
    //             {
    //                 console.error("Error getting geolocation: ", error);
    //             }
    //         ); 
    //     } 
    // }

    // const handleCheckLocation = () => {
    //     // Hardcoded location for testing purposes (simulating user movement)
    //     const newLocation = [37.7749, -102.4194]; // Example coordinates for San Francisco
    //     updateLocation(newLocation);
    // };

    console.log("Progress component:", {
        firstClue,
        currentLocation,
    });
    console.log("first Clue:", firstClue);

    return (
        <div className="other-content">
            <h2>Progress</h2>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h4 style={{ margin: 0, marginRight: "10px" }}>
                        Your location:
                    </h4>  
                    <button type="submit" onClick={handleCheckLocation}>Check Location</button>
                </div>
                {gameStarted && (
                    <div>
                        <p>Latitude: {currentLocation[0]}</p>
                        <p>Longitude: {currentLocation[1]}</p>
                    </div>
                )}
            </div>
            <div>
                <span>Distance to Target: </span>
            </div>
            <div>
                <span>Current Clue: {firstClue}</span>
                {/* show one hint at a time */}
            </div>
        </div>
    );
};

Progress.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    firstClue: PropTypes.string.isRequired,
    gameStarted: PropTypes.bool.isRequired,
    updateLocation: PropTypes.func.isRequired,
};

export default Progress;

// how progress table should look like

// [
//     {
//         "id": 1,
//         "userId": 1,
//         "huntId": 1,
//         "currentLocationIndex": 2,
//         "visitedLocations": [
//             1,
//             2,
//             3
//         ],
//         "nextHint": "Go to the corner"
//     },
//     {
//         "id": 2,
//         "userId": 1,
//         "huntId": 2,
//         "currentLocationIndex": 0,
//         "visitedLocations": [
//             1
//         ],
//         "nextHint": "Find the gold statue"
//     },
//     {
//         "id": 3,
//         "userId": 2,
//         "huntId": 3,
//         "currentLocationIndex": 3,
//         "visitedLocations": [
//             1,
//             2,
//             3,
//             4
//         ],
//         "nextHint": "Cross the bridge"
//     }
// ]
