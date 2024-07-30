import { useEffect, useState } from "react";
import InputForm from "./InputForm";
import Progress from "./Progress";
import MapContainer from "./MapContainer";
import "./MapStyles.css"; // Map-specific styles
import "./AppContent.css"; // General styles
import calculateDistance from "../utilityFunctions/calculateDistance";

// const kBaseUrl = import.meta.env.REACT_APP_BACKEND_URL;

const hardCodedGamePiece = {
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
    const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);

    //callback function to get selection from InputForm
    const handleSelectionData = (gameSelections) => {
        console.log("Starting game with this selections:", gameSelections);
        setSelectionData(gameSelections);
        console.log("selectionData:", selectionData);
    };

    useEffect(() => {
        console.log("selectionData has been updated:", selectionData);
    }, [selectionData]);

    const handleStartGame = (hardCodedGamePiece) => {
        console.log("Starting game with this data:", hardCodedGamePiece);
        setGameData(hardCodedGamePiece);
    };
    const startGame = () => {
        handleSelectionData(selectionData);
        handleStartGame(hardCodedGamePiece);
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
                    <div className="progresss-tracking">
                        <Progress
                            currentLocation={currentLocation}
                            gameData={gameData}
                        />
                    </div>
                </div>
                <div className="map-container">{<MapContainer />}</div>
            </div>
        </div>
    );
};
export default AppContent;
