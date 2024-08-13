import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import InstructionPopUp from "./InstructionPopUp";
import calculateDistance from "../utilityFunctions/calculateDistance";
import { Snackbar, Alert, LinearProgress } from "@mui/material";
import "./MapStyles.css";
import "./AppContent.css";
import GameStartedMsg from "./GameStartedMsg";
import kmToMi from "../utilityFunctions/kmToMi";

const kBaseUrl = "https://games-afoot.onrender.com";

const AppContent = () => {
    const [selectionData, setSelectionData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [currentLocationIndex, setCurrentLocationIndex] = useState(0);
    const [currentClueIndex, setCurrentClueIndex] = useState(0);
    const [currentClue, setCurrentClue] = useState("");
    const [clueDescription, setClueDescription] = useState("");
    const [descriptionVisible, setDescriptionVisible] = useState(false);
    const [locationName, setLocationName] = useState("");
    const [locationNameVisible, setLocationNameVisible] = useState(false);
    const [distanceToTarget, setDistanceToTarget] = useState(0);
    const [gameComplete, setGameComplete] = useState(false);
    const [progressData, setProgressData] = useState(null);
    const [open, setOpen] = useState(false);
    const [finishMessage, setFinishMessage] = useState("");
    const [showGameStartedMsg, setShowGameStartedMsg] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [milesOrKm, setMilesOrKm] = useState("miles");

    const updateLocation = (newLocation) => {
        setCurrentLocation(newLocation);
    };

    const handleSelectionData = (gameSelections) => {
        setSelectionData(gameSelections);
        console.log("Called handleSelectionData:", gameSelections);
    };

    const checkProximity = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    const newPosition = [latitude, longitude];
                    console.log(
                        "Check Location Button Clicked - Current Position:",
                        newPosition
                    );
                    updateLocation(newPosition);

                    if (gameData) {
                        const { latitude: targetLat, longitude: targetLng } =
                            gameData.locations[currentLocationIndex];
                        const distance = calculateDistance(
                            newPosition[0],
                            newPosition[1],
                            parseFloat(targetLat),
                            parseFloat(targetLng)
                        );
                        console.log(`Distance to target site: ${distance} km`);
                        console.log(
                            `Miles to target site: ${kmToMi(distance)} mi`
                        );
                        setDistanceToTarget(distance);
                        console.log("Show game data", gameData);

                        if (distance < 0.05) {
                            setLocationName(
                                gameData.locations[currentLocationIndex].name
                            );
                            setClueDescription(
                                gameData.locations[currentLocationIndex]
                                    .description
                            );
                            setDescriptionVisible(true);
                            setLocationNameVisible(true);

                            const newProgressData = {
                                id: progressData.id,
                                targetLocationIndex: currentLocationIndex,
                                gameComplete: gameComplete,
                                userId: 1,
                                huntId: gameData.huntId,
                            };
                            updateProgress(newProgressData);
                            setTimeout(() => {
                                moveToNextLocation();
                            }, 6000);
                        }
                    }
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

    const moveToNextLocation = async () => {
        try {
            const response = await axios.get(
                `${kBaseUrl}/progress/${progressData.id}`
            );
            const updatedProgressData = response.data;

            if (updatedProgressData.gameComplete) {
                console.log("The game is complete!");
                setGameComplete(true);
                setFinishMessage(
                    "Congratulations! You have completed the game."
                );
                setOpen(true);
                return;
            }

            if (currentLocationIndex < gameData.locations.length - 1) {
                const nextIndex = currentLocationIndex + 1;
                setCurrentLocationIndex(nextIndex);
                setCurrentClueIndex(0);
                setCurrentClue(gameData.locations[nextIndex].clues[0]);
                setLocationName("");
                setClueDescription("");
                setDescriptionVisible(false);
                setLocationNameVisible(false);
            } else {
                console.log("You have reached the final location!");
                setGameComplete(true);
                completeGameProgress(progressData);
                setFinishMessage(
                    "Congratulations! You have completed the game."
                );
                setOpen(true);
            }
        } catch (error) {
            console.error("Error checking game completion:", error);
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
        setIsLoading(true);
        try {
            if (selectionData) {
                console.log("this is selectiondata", selectionData);
                // Post to create hunt
                const response = await axios.post(`${kBaseUrl}/hunts`, {
                    ...selectionData,
                });

                if (response.data && response.data.id) {
                    const huntId = response.data.id;
                    try {
                        const generateLocationsResponse = await axios.post(
                            `${kBaseUrl}/hunts/${huntId}/generate_locations`
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
                            `${kBaseUrl}/hunts/${huntId}/locations`
                        );
                        const locationsData = locationsResponse.data;
                        console.log("Locations data:", locationsData);
                        if (locationsData && locationsData.length > 0) {
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
                            setIsLoading(false);
                            setShowGameStartedMsg(true);
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
            const newProgressData = {
                huntId: huntId,
                targetLocationIndex: currentLocationIndex,
                gameComplete: gameComplete,
                userId: userId,
            };

            const response = await axios.post(
                `${kBaseUrl}/progress`,
                newProgressData
            );

            if (response.data && response.data.id) {
                const progressId = response.data.id;
                console.log("Progress ID came back:", progressId);
                const progressInfo = response.data;
                console.log("Progress data returned:", progressInfo);
                setProgressData(progressInfo);
            } else {
                console.log("No progress data returned");
            }
        } catch (error) {
            console.error("Error creating progress:", error);
        }
    };

    const handleProgressUpdate = async (url) => {
        // console.log("logging progress data", progressData);

        try {
            const response = await axios.patch(url);
            if (response.status === 200 && response.data) {
                console.log("Progress updated successfully:", response.data);
                setProgressData(response.data);
            } else {
                console.log("Failed to update progress,", response.status);
            }
        } catch (error) {
            console.error("Error updating progress:", error);
        }
    };

    const updateProgress = async (progressData) => {
        const id = progressData.id;
        const url = `${kBaseUrl}/progress/${id}/update-progress`;
        console.log("Updating progress with ID:", progressData.id);
        await handleProgressUpdate(url, progressData);
        saveGameStateToLocal(gameData, progressData);
    };

    const completeGameProgress = async (progressData) => {
        const id = progressData.id;
        const url = `${kBaseUrl}/progress/${id}/complete-game`;
        console.log("Game completed progress with ID:", progressData.id);
        await handleProgressUpdate(url, progressData);
        saveGameStateToLocal(gameData, progressData);

        // Clear local storage after completing the game
        localStorage.removeItem("gameState");
    };

    const saveGameStateToLocal = useCallback(() => {
        const gameState = {
            gameData,
            progressData,
            selectionData,
            currentLocationIndex,
            currentClueIndex,
            currentClue,
            distanceToTarget,
            gameComplete,
        };
        localStorage.setItem("gameState", JSON.stringify(gameState));
    }, [
        gameData,
        progressData,
        selectionData,
        currentLocationIndex,
        currentClueIndex,
        currentClue,
        distanceToTarget,
        gameComplete,
    ]);

    useEffect(() => {
        if (progressData) {
            console.log("Progress data updated:", progressData);
            saveGameStateToLocal();
        }
    }, [progressData, saveGameStateToLocal]);

    const handleContinueGame = () => {
        if (progressData && gameData) {
            return;
        }
        try {
            const savedState = JSON.parse(localStorage.getItem("gameState"));
            if (savedState) {
                const {
                    gameData: savedGameData,
                    progressData: savedProgressData,
                    selectionData: savedSelectionData,
                    currentLocationIndex,
                    currentClueIndex,
                    currentClue,
                    distanceToTarget,
                    gameComplete,
                } = savedState;

                if (savedGameData && savedProgressData) {
                    setGameData(savedGameData);
                    setProgressData(savedProgressData);
                    setSelectionData(savedSelectionData);

                    setCurrentLocationIndex(currentLocationIndex || 0);
                    setCurrentClueIndex(currentClueIndex || 0);
                    setCurrentClue(currentClue || "");
                    setClueDescription(clueDescription || "");
                    setDescriptionVisible(descriptionVisible || false);
                    setLocationName(locationName || "");
                    setLocationNameVisible(locationNameVisible || false);
                    setDistanceToTarget(distanceToTarget || 0);
                    setGameComplete(gameComplete || false);
                } else {
                    console.log("No saved game state found.");
                }
            } else {
                console.log("No saved game state found.");
            }
        } catch (error) {
            console.error(
                "Error loading game state from local storage:",
                error
            );
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
    handleContinueGame();
    return (
        <div>
            <div className="content">
                <div className="other-content">
                    <div className="user-input">
                        {showGameStartedMsg ? (
                            <GameStartedMsg setShow={setShowGameStartedMsg} />
                        ) : null}
                        <div className="instruction-icon">
                            <InstructionPopUp />
                        </div>

                        <InputForm
                            initialSelectionData={selectionData}
                            handleSelectionData={handleSelectionData}
                            currentLocation={currentLocation}
                            startGame={startGame}
                        />
                        {isLoading ? (
                            <LinearProgress color="secondary" />
                        ) : null}
                    </div>
                    <div className="progress-tracking">
                        <Progress
                            currentLocation={currentLocation}
                            currentClue={currentClue}
                            checkProximity={checkProximity}
                            distanceToTarget={distanceToTarget}
                            nextClue={nextClue}
                            clueDescription={clueDescription}
                            descriptionVisible={descriptionVisible}
                            locationName={locationName}
                            locationNameVisible={locationNameVisible}
                            milesOrKm={milesOrKm}
                            setMilesOrKm={setMilesOrKm}
                        />
                    </div>
                </div>
                <div className="map-container">
                    {
                        <MapContainer
                            currentLocation={currentLocation}
                            updateLocation={updateLocation}
                        />
                    }
                </div>
            </div>
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={() => setOpen(false)}
            >
                <Alert onClose={() => setOpen(false)} severity="success">
                    {finishMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default AppContent;
