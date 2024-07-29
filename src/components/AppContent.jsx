import { useEffect, useCallback, useState } from "react";
import InputForm from "./components/InputForm";
import Progress from "./components/Progress";
import MapContainer from "./components/MapContainer";
import huntMockData from "../mocks/huntMockData.json";

// const kBaseUrl = import.meta.env.REACT_APP_BACKEND_URL;

const AppContent = () => {
    const [selectionData, setSelectionData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);
    const [userCheckedLocation, setUserCheckedLocation] = useState(false);

    const handleSelectionData = (gameSelections) => {
        console.log("Starting game with this selections:", gameSelections);
        setSelectionData(gameSelections);
    };

    // Use mockFetch function to simulate API call
    const mockFetch = (selectionData) => {
        return new Promise((resolve) => {
            setTimeout(() => {
                console.log("Mock sending data:", selectionData);
                resolve({
                    ok: true,
                    json: () => Promise.resolve(huntMockData),
                });
            }, 1000);
        });
    };

    const handleStartGame = (selectionData) => {
        try {
            // Use mockFetch instead of fetch
            const response = mockFetch(selectionData);
            if (response.ok) {
                const gamePiece = response.json();
                console.log(gamePiece);
                setGameData(gamePiece);
            } else {
                console.error("Error starting game:", response.statusText);
            }
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };
    // API call when backend is ready
    // try {
    //     const response = await fetch(kBaseUrl, {
    //         method: "POST",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify(gameData),
    //     });

    //     const data = await response.json();
    //     startGame(data);
    // } catch (error) {
    //     console.error("Error starting game:", error);
    // }
    //};
    const updateLocation = useCallback((location) => {
        //Only update current location if the user click check location button
        // to prevent overloading the API
        setCurrentLocation(location);
        setUserCheckedLocation(true);
    }, []);

    const handleCheckLocationClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPosition = [latitude, longitude];
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
    };

    useEffect(() => {
        if (userCheckedLocation && currentLocation) {
            // Only update location when the user clicks the check location button
            checkProximityToLandmark(currentLocation);
        }
    }, [
        userCheckedLocation,
        currentLocation,
        gameData,
        checkProximityToLandmark,
    ]);

    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        const R = 6371; // Radius of the earth in km
        const dLat = ((lat2 - lat1) * Math.PI) / 180;
        const dLon = ((lon2 - lon1) * Math.PI) / 180;
        const a =
            0.5 -
            Math.cos(dLat) / 2 +
            (Math.cos((lat1 * Math.PI) / 180) *
                Math.cos((lat2 * Math.PI) / 180) *
                (1 - Math.cos(dLon))) /
                2;
        return R * 2 * Math.asin(Math.sqrt(a));
    };
    // Check distance from the landmark and update hints(need to add)
    const checkProximityToLandmark = useCallback(
        (location) => {
            const [latitude, longitude] = location;
            if (gameData && gameData.locations) {
                gameData.locations.forEach((landmark) => {
                    //converting string to number
                    const landmarkLat = parseFloat(landmark["location lat"]);
                    const landmarkLong = parseFloat(landmark["location long"]);

                    if (!isNaN(landmarkLat) && !isNaN(landmarkLong)) {
                        const distance = calculateDistance(
                            latitude,
                            longitude,
                            landmarkLat,
                            landmarkLong
                        );
                        if (distance < 0.1) {
                            console.log("Userfound landmark!");
                        } else {
                            console.log("User is not near the landmark");
                        }
                    } else {
                        console.error(
                            "Invalid landmark cordinations",
                            landmark
                        );
                    }
                });
            } else {
                console.error("Game data or landmark data not available");
            }
        },
        [gameData]
    );

    useEffect(() => {
        if (userCheckedLocation && currentLocation) {
            checkProximityToLandmark(currentLocation);
        }
    }, [
        userCheckedLocation,
        currentLocation,
        gameData,
        checkProximityToLandmark,
    ]);

    const startGame = () => {
        handleSelectionData();
        handleStartGame();
        checkProximityToLandmark();
    };

    return (
        <div>
            <div className="content">
                <div className="other-content">
                    <InputForm
                        getSelections={handleSelectionData}
                        currentLocation={currentLocation}
                    />
                    <div className="map-container">
                        {gameData && (
                            <>
                                <MapContainer updateLocation={updateLocation} />
                                <Progress
                                    onCheckLocation={handleCheckLocationClick}
                                    currentLocation={currentLocation}
                                    gameData={gameData}
                                />
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default AppContent;
