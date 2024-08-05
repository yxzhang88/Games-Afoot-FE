import { useState } from "react";
import PropTypes from "prop-types";

function InputForm({ currentLocation, startGame }) {
    const [distance, setDistance] = useState("");
    const [numSites, setNumSites] = useState("");
    const [gameType, setGameType] = useState("");

    const isPositiveNum = (value) => /^[1-9]\d*$/.test(value);
    const isNonEmptyString = (value) => value.trim().length > 0;

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!distance || !numSites || !gameType) {
            alert("Please enter all options");
            return;
        }

        if (!isPositiveNum(distance) || Number(distance) > 99) {
            alert(
                "Please enter a valid positive number for distance up to 99 miles"
            );
            return;
        }

        if (!isPositiveNum(numSites)) {
            alert("Please enter a valid postive number for sites");
            return;
        }

        if (!isNonEmptyString(gameType)) {
            alert("Please enter a valid game type");
            return;
        }

        console.log("Selections from inputform:", {
            currentLocation,
            distance,
            numSites,
            gameType,
        });

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
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="distance">Distance:</label>
                    <input
                        type="text"
                        id="distance"
                        value={distance}
                        onChange={(e) => setDistance(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label htmlFor="numSites">Number of Sites:</label>
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
                    <input
                        type="text"
                        id="gameType"
                        value={gameType}
                        onChange={(e) => setGameType(e.target.value)}
                    ></input>
                </div>
                <div>
                    <p>Latitude: {currentLocation[0]}</p>
                    <p>Longitude: {currentLocation[1]}</p>
                </div>
                <button onClick={handleSubmit} type="submit">
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
