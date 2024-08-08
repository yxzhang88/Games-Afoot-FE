import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import calculateDistance from "../utilityFunctions/calculateDistance";
import "./MapStyles.css";
import "./AppContent.css"; // General styles

const AppContent = () => {
    const [selectionData, setSelectionData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [currentClue, setCurrentClue] = useState("");
    const [clueDescription, setClueDescription] = useState("");
    const [distanceToTarget, setDistanceToTarget] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    const updateLocation = (newLocation) => {
        setCurrentLocation(newLocation);
    };

    const handleSelectionData = (gameSelections) => {
        setSelectionData(gameSelections);
        console.log("Called handleSelectionData:", gameSelections);
    };

    const checkProximity = () => {
        if (gameData) {
            const { latitude, longitude } =
                gameData.locations[currentLocationIndex];
            const distance = calculateDistance(
                currentLocation[0],
                currentLocation[1],
                parseFloat(latitude), // Convert to float from string
                parseFloat(longitude)
            );
            console.log(`Distance to target site: ${distance} km`);
            setDistanceToTarget(distance);
            console.log("Show game data", gameData);
            const progressData = {
                targetLocationIndex: currentLocationIndex,
                gameComplete: gameComplete,
                userId: 1, // Assuming a static userId for simplicity
                huntId: gameData.huntId, // Assuming huntId is part of gameData
            };
            saveProgress(progressData);
            if (distance < 0.05) {
                moveToNextLocation();
            }
        }
    };

    const moveToNextLocation = () => {
        if (currentLocationIndex < gameData.locations.length - 1) {
            const nextIndex = currentLocationIndex + 1;
            setCurrentLocationIndex(nextIndex);
            setCurrentClueIndex(0); // Reset clue index for the new location
            setCurrentClue(gameData.locations[nextIndex].clues[0]); // Set the first clue for the new location
            setClueDescription(gameData.locations[nextIndex].description);
        } else {
            console.log("You have reached the final location!");
            setGameComplete(true);
            alert("Congratulations! You have completed the game.");
        }
    };

    const nextClue = () => {
        if (gameData) {
            const location = gameData.locations[currentLocationIndex];
            if (currentClueIndex < location.clues.length - 1) {
                const nextClueIndex = currentClueIndex + 1;
                setCurrentClueIndex(nextClueIndex);
                setCurrentClue(location.clues[nextClueIndex]);
            } else {
                console.log("No more clues for this location.");
            }
        }
    };

    const getGameData = async (selectionData) => {
        try {
            if (selectionData) {
                console.log("this is selectiondata", selectionData);
                // Post to create hunt
                const response = await axios.post(
                    "https://games-afoot.onrender.com/hunts",
                    {
                        ...selectionData,
                        // startLatitude: parseFloat(selectionData.startLatitude),
                        // startLongitude: parseFloat(
                        //     selectionData.startLongitude
                        // ),
                    }
                );

                if (response.data && response.data.id) {
                    const huntId = response.data.id;
                    try {
                        const generateLocationsResponse = await axios.post(
                            `https://games-afoot.onrender.com/hunts/${huntId}/generate_locations`
                        );
                        const generateLocations =
                            generateLocationsResponse.data;
                        if (generateLocations) {
                            console.log(
                                "Locations successfully added to Hunt ID",
                                { huntId }
                            );
                        } else {
                            console.log("Locations data is empty");
                        }
                    } catch (error) {
                        console.error("Error posting locations:", error);
                    }
                    try {
                        console.log("Hunt data:", response.data);
                        const huntId = response.data.id;
                        console.log("Hunt ID:", huntId);
                        const locationsResponse = await axios.get(
                            `https://games-afoot.onrender.com/hunts/${huntId}/locations`
                        );
                        const locationsData = locationsResponse.data;
                        console.log("Locations data:", locationsData);
                        if (locationsData && locationsData.length > 0) {
                            // const gamePiece = { locations: locationsData };
                            const gamePiece = {
                                huntId: huntId,
                                locations: locationsData,
                            };
                            setGameData(gamePiece);
                            await createProgress(
                                currentLocationIndex,
                                huntId,
                                gameComplete
                            );
                        } else {
                            console.log("Locations data is empty");
                        }
                    } catch (error) {
                        console.error("Error fetching locations:", error);
                    }
                } else {
                    console.log(
                        "POST /hunts response does not contain hunt ID"
                    );
                }
            } else {
                console.log("Selection data is empty");
            }
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    useEffect(() => {
        console.log("game piece has been updated:", gameData);
    }, [gameData]);

    useEffect(() => {
        if (gameData && gameData.locations.length > 0) {
            const location = gameData.locations[currentLocationIndex];
            const { clues, description } = location;
            console.log(clues);
            if (clues && clues.length > 0) {
                setCurrentClue(clues[currentClueIndex]);
                setClueDescription(description);
            }
        }
    }, [gameData, currentLocationIndex, currentClueIndex]);

    const createProgress = async (
        currentLocationIndex,
        huntId,
        gameComplete
    ) => {
        try {
            const userId = 1;
            const progressData = {
                huntId: huntId,
                targetLocationIndex: currentLocationIndex,
                gameComplete: gameComplete,
                userId: userId,
            };
            console.log("Progress saved:", progressData);
            const response = await axios.post(
                `https://games-afoot.onrender.com/progress`,
                progressData
            );
            console.log("Progress saved:", progressData);

            if (response.data && response.data.id) {
                const progressId = response.data.id;
                console.log("Progress ID:", progressId);
            } else {
                console.log("No progress ID");
            }
        } catch (error) {
            console.error("Error creating progress:", error);
        }
    };

    const saveProgress = async (progressData, progressId) => {
        const id = progressId;
        try {
            console.log("Progress saved:", progressData);
            await axios.patch(
                `https://games-afoot.onrender.com/progress/${id}/update-progress}`,
                progressData
            );
            console.log("Progress saved:", progressData);
        } catch (error) {
            console.error("Error saving progress:", error);
        }
    };

    const startGame = (selectionData) => {
        if (selectionData) {
            handleSelectionData(selectionData);
            getGameData(selectionData);
        } else {
            console.log("Selection data or game piece is empty");
        }
    };

    // Mock location manually for testing
    // const setMockLocation = (lat, lon) => {
    //     setCurrentLocation([lat, lon]);
    //     checkProximity();
    // };

    return (
        <div>
            <div className="content">
                <div className="other-content">
                    <div className="user-input">
                        <InputForm
                            handleSelectionData={handleSelectionData}
                            currentLocation={currentLocation}
                            startGame={startGame}
                        />
                        {/* <button
                            onClick={() => setMockLocation(37.7353, -122.4767)}
                        >
                            Set Mock Location to Golden Gate Park
                        </button>
                        <button
                            onClick={() => setMockLocation(37.7375, -122.4782)}
                        >
                            Set Mock Location to San Francisco History Museum
                        </button>
                        <button
                            onClick={() => setMockLocation(37.7749, -122.4194)}
                        >
                            Set Mock Location to Coit Tower
                        </button> */}
                    </div>
                    <div className="progress-tracking">
                        <Progress
                            currentLocation={currentLocation}
                            currentClue={currentClue}
                            checkProximity={checkProximity}
                            distanceToTarget={distanceToTarget}
                            nextClue={nextClue}
                            clueDescription={clueDescription}
                        />
                    </div>
                </div>
                <div className="map-container">
                    {<MapContainer updateLocation={updateLocation} />}
                </div>
            </div>
        </div>
    );
};

export default AppContent;
