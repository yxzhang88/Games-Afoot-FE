import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import "./MapStyles.css"; // Map-specific styles
import "./AppContent.css"; // General styles

// const kBaseUrl = import.meta.env.REACT_APP_BACKEND_URL;

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
    ],
};

const AppContent = () => {
    const [selectionData, setSelectionData] = useState(null);
    const [gameData, setGameData] = useState(null);
    const [firstClue, setFirstClue] = useState("");
    const [currentLocation, setCurrentLocation] = useState([0, 0]);
    const [gameStarted, setGameStarted] = useState(false); // Track if the game has started

    const updateLocation = (newLocation) =>
    {
        console.log("Updating location in AppContent:", newLocation);
        setCurrentLocation(newLocation);
    };

    //callback function to get selection from InputForm
    const handleSelectionData = (gameSelections) => {
        setSelectionData(gameSelections);
    };

    useEffect(() => {
        console.log("selectionData has been updated:", selectionData);
    }, [selectionData]);

    const handleStartGame = (gamePiece) => {
        if (
            gamePiece &&
            gamePiece.locations &&
            gamePiece.locations.length > 0
        ) {
            var firstHint = gamePiece.locations[0].clues[0];
            setFirstClue(firstHint);
            setGameData(gamePiece);
            setGameStarted(true); // Set gameStarted to true

        } else {
            console.log("gamePiece is empty");
        }
    };

    useEffect(() => {
        console.log("Game hint updated", firstClue);
    }, [firstClue]);

    const startGame = () => {
        handleSelectionData(selectionData);
        handleStartGame(gamePiece);
    };

    return (
        <div>
            <div className="content">
                <div className="other-content">
                    <div className="user-input">
                        <InputForm
                            getSelections={handleSelectionData}
                            currentLocation={currentLocation}
                            startGame={startGame}
                        />
                    </div>
                    <div className="progress-tracking">
                        <Progress
                            currentLocation={currentLocation}
                            firstClue={firstClue}
                            gameStarted={gameStarted}
                            updateLocation={updateLocation}
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
