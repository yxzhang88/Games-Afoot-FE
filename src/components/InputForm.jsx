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
            alert("Please select all options");
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
            <h2>Select From Below</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="distance">Distance:</label>
                    <select
                        id="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    >
                        <option value="">Select Distance</option>
                        <option value="1">1 mile</option>
                        <option value="3">3 miles</option>
                        <option value="5">5 miles</option>
                        <option value="7">7 miles</option>
                        <option value="10">10 miles</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="numSites">Num of Sites:</label>
                    <select
                        id="numSites"
                        value={numSites}
                        onChange={(e) => setNumSites(e.target.value)}
                    >
                        <option value="">Select Number of Sites</option>
                        <option value="1">1 site</option>
                        <option value="3">3 sites</option>
                        <option value="5">5 sites</option>
                        <option value="7">7 sites</option>
                        <option value="10">10 sites</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="gameType">Game Type:</label>
                    <select
                        id="gameType"
                        value={gameType}
                        onChange={(e) => setGameType(e.target.value)}
                    >
                        <option value="">Select Game Type</option>
                        <option value="type1">Historical Sites</option>
                        <option value="type2">Museums</option>
                        <option value="type3">Famous Landmarks</option>
                    </select>
                </div>
                <div>
                    <p>Latitude: {currentLocation[0]}</p>
                    <p>Longitude: {currentLocation[1]}</p>
                </div>
                <button onClick={startGame} type="submit">
                    Start Game
                </button>
                {/* Add reset game button later */}
            </form>
        </div>
    );
}

InputForm.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    startGame: PropTypes.func.isRequired,
};

export default InputForm;
