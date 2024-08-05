import { useState } from "react";
import PropTypes from "prop-types";

function InputForm({ currentLocation, startGame }) {
    const [distance, setDistance] = useState("");
    const [numSites, setNumSites] = useState("");
    const [gameType, setGameType] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Selections from inputform:", {
            currentLocation,
            distance,
            numSites,
            gameType,
        });
        if (!distance || !numSites || !gameType) {
            alert("Please fill in all fields");
            return;
        }
        const gameSelections = {
            distance_in_miles: distance.toString(),
            games_type: gameType.toLowerCase(),
            num_of_sites: numSites.toString(),
            start_latitude: currentLocation[0].toString(),
            start_longitude: currentLocation[1].toString(),
        };

        startGame(gameSelections);
    };

    return (
        <div className="input-form">
            <h2>Enter Details Below</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="distance">Distance (in miles):</label>
                    <input
                        type="text"
                        id="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                        placeholder="Enter distance"
                    />
                </div>
                <div>
                    <label htmlFor="numSites">Number of Sites:</label>
                    <input
                        type="text"
                        id="numSites"
                        value={numSites}
                        onChange={(e) => setNumSites(e.target.value)}
                        placeholder="Enter number of sites"
                    />
                </div>
                <div>
                    <label htmlFor="gameType">Game Type:</label>
                    <input
                        type="text"
                        id="gameType"
                        value={gameType}
                        onChange={(e) => setGameType(e.target.value)}
                        placeholder="Enter game type"
                    />
                </div>
                <div>
                    <p>Latitude: {currentLocation[0]}</p>
                    <p>Longitude: {currentLocation[1]}</p>
                </div>
                <button type="submit">
                    Start Game
                </button>
            </form>
        </div>
    );
}

InputForm.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    startGame: PropTypes.func.isRequired,
};

export default InputForm;
