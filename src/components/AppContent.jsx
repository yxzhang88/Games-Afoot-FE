import { useEffect, useState } from "react";
import axios from "axios";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import calculateDistance from "../utilityFunctions/calculateDistance";
import { Snackbar, Alert } from "@mui/material";
import "./MapStyles.css";
import "./AppContent.css";

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

            if (distance < 0.05) {
                setLocationName(gameData.locations[currentLocationIndex].name);
                setClueDescription(
                    gameData.locations[currentLocationIndex].description
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

    useEffect(() => {
        if (progressData) {
            console.log("Progress data updated:", progressData);
        }
    }, [progressData]);

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
    };

    const completeGameProgress = async (progressData) => {
        const id = progressData.id;
        const url = `${kBaseUrl}/progress/${id}/complete-game`;
        console.log("Game completed progress with ID:", progressData.id);
        await handleProgressUpdate(url, progressData);
    };

    const startGame = (selectionData) => {
        if (selectionData) {
            handleSelectionData(selectionData);
            getGameData(selectionData);
        } else {
            console.log("Selection data or game piece is empty");
        }
    };

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
