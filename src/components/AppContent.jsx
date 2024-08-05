import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import calculateDistance from "../utilityFunctions/calculateDistance";
import "./MapStyles.css";
import "./AppContent.css"; // General styles
import InstructionPopUp from "./InstructionPopUp";

const gamePiece = {
    locations: [
        {
            clues: [
                "A historic park featuring a beautiful garden and scenic views of San Francisco Bay.",
                "It includes walking trails, a pond, and several historical monuments.",
                "Look for the large gazebo and picnic areas.",
            ],
            description:
                "A popular park in San Francisco known for its picturesque landscapes and family-friendly environment.",
            id: 1,
            latitude: "37.7353",
            longitude: "-122.4767",
            name: "Golden Gate Park",
        },
        {
            clues: [
                "This historic site is known for its role in the early development of San Francisco.",
                "It features a museum with exhibits on local history and a preserved 19th-century building.",
                "Look for the old brick building with a clock tower.",
            ],
            description:
                "A local museum offering insights into the early history of San Francisco and its development.",
            id: 2,
            latitude: "37.7375",
            longitude: "-122.4782",
            name: "San Francisco History Museum",
        },
        {
            clues: [
                "A well-known landmark offering panoramic views of the city and the Bay Area.",
                "It features an observation deck and is a popular spot for tourists.",
                "Look for the tall tower with a revolving restaurant.",
            ],
            description:
                "An iconic observation tower providing stunning views of San Francisco and its surroundings.",
            id: 3,
            latitude: "37.7749",
            longitude: "-122.4194",
            name: "Coit Tower",
        },
    ],
};

const AppContent = () => {
    const [selectionData, setSelectionData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [currentClue, setCurrentClue] = useState("");
    const [distanceToTarget, setDistanceToTarget] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);

    const updateLocation = (newLocation) => {
        setCurrentLocation(newLocation);
    };

    const handleSelectionData = (gameSelections) => {
        setSelectionData(gameSelections);
    };

    const checkProximity = () => {
        if (gameData) {
            const { latitude, longitude } = gameData.locations[currentLocationIndex];
            const distance = calculateDistance(
                currentLocation[0],
                currentLocation[1],
                parseFloat(latitude), // Convert to float from string
                parseFloat(longitude)
            );
            console.log(`Distance to target site: ${distance} km`);
            setDistanceToTarget(distance);
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

    const handleStartGame = async (selectionData) => {
        try {
            if (selectionData) {
                // Post to create hunt
                const response = await axios.post("https://games-afoot.onrender.com/hunts", {
                    ...selectionData,
                    startLatitude: currentLocation[0],
                    startLongitude: currentLocation[1],
                });

                // Handle the hunt response
                const huntId = response.data.id;
                const locationsResponse = await axios.get(`https://games-afoot.onrender.com/hunts/${huntId}/locations`);
                const locationsData = locationsResponse.data;

                // Update game data with the fetched locations
                handleStartGame({ ...gamePiece, locations: locationsData });
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
            const { clues } = gameData.locations[currentLocationIndex];
            console.log(clues);
            if (clues && clues.length > 0) {
                setCurrentClue(clues[currentClueIndex]);
            }
        }
    }, [gameData, currentLocationIndex, currentClueIndex]);

    const startGame = (selectionData) => {
        if (selectionData && gamePiece) {
            handleSelectionData(selectionData);
            handleStartGame(selectionData); // Pass selectionData to the async function
        } else {
            console.log("Selection data or game piece is empty");
        }
    };

    // Mock location manually for testing
    const setMockLocation = (lat, lon) => {
        setCurrentLocation([lat, lon]);
        checkProximity();
    };

    return (
        <div>
            <div className="content">
                <div className="other-content">
                    <div className="user-input">
                        <div className="instruction-icon">
                            <InstructionPopUp />
                        </div>
                        <InputForm
                            handleSelectionData={handleSelectionData}
                            currentLocation={currentLocation}
                            startGame={startGame}
                        />
                        <button
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
                        </button>
                    </div>
                    <div className="progress-tracking">
                        <Progress
                            currentLocation={currentLocation}
                            currentClue={currentClue}
                            checkProximity={checkProximity}
                            distanceToTarget={distanceToTarget}
                            nextClue={nextClue}
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
