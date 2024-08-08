import { useState } from "react";
import PropTypes from "prop-types";

function InputForm({ currentLocation, startGame }) {
    const [distance, setDistance] = useState("");
    const [numSites, setNumSites] = useState("");
    const [gameType, setGameType] = useState("");
    const [distanceError, setDistanceError] = useState("");
    const [gameTypeError, setGameTypeError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true); // State to manage visibility

    const handleDistanceValidation = (e) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) {
            // Allow only up to two digits
            setDistance(value);
            setDistanceError(""); // Clear error if valid
        } else {
            setDistanceError("Please enter a valid number (up to 99 miles).");
        }
    };

    const handleGameTypeValidation = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) {
            // Allow only letters and spaces
            setGameType(value);
            setGameTypeError(""); // Clear error if valid
        } else {
            setGameTypeError(
                "Please enter only letters and spaces for game type."
            );
        }
    };

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
            distance: distance.toString(),
            gameType: gameType.toLowerCase(),
            numSites: numSites.toString(),
            startLatitude: currentLocation[0].toString(),
            startLongitude: currentLocation[1].toString(),
        };
        startGame(gameSelections);
    };

    return (
        <div className="input-form">
            <h2
                onClick={() => setIsFormVisible(!isFormVisible)}
                className="toggle-header"
            >
                Enter Details Below
                <span
                    className={`arrow ${isFormVisible ? "up" : "down"}`}
                ></span>
            </h2>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="distance">Distance (in miles):</label>
                        <input
                            type="text"
                            id="distance"
                            value={distance}
                            onChange={handleDistanceValidation}
                            placeholder="Enter distance"
                            maxLength="2"
                        />
                        {distanceError && (
                            <p style={{ color: "red" }}>{distanceError}</p>
                        )}
                    </div>
                    <div>
                        <label htmlFor="numSites">Number of Sites:</label>
                        <select
                            id="numSites"
                            value={numSites}
                            onChange={(e) => setNumSites(e.target.value)}
                        >
                            <option value="">Select Number of Sites</option>
                            {[...Array(10).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1} site{num > 0 ? "s" : ""}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="gameType">Game Type:</label>
                        <input
                            type="text"
                            id="gameType"
                            value={gameType}
                            onChange={handleGameTypeValidation}
                            placeholder="Enter game type"
                            maxLength={30}
                        />
                        {gameTypeError && (
                            <p style={{ color: "red" }}>{gameTypeError}</p>
                        )}
                    </div>
                    <div>
                        <p>Latitude: {currentLocation[0]}</p>
                        <p>Longitude: {currentLocation[1]}</p>
                    </div>
                    <button type="submit">Start Game</button>
                    {/* Add reset game button later */}
                </form>
            )}
        </div>
    );
}

InputForm.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    startGame: PropTypes.func.isRequired,
};

export default InputForm;
