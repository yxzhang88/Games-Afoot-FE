import { useState } from "react";
import PropTypes from "prop-types";

function InputForm({ currentLocation, startGame }) {
    const [distance, setDistance] = useState("");
    const [numSites, setNumSites] = useState("");
    const [gameType, setGameType] = useState("");
    const [distanceError, setDistanceError] = useState("");
    const [gameTypeError, setGameTypeError] = useState("");
    const [isFormVisible, setIsFormVisible] = useState(true); // State to manage visibility

    const handleDistanceChange = (e) => {
        const value = e.target.value;
        if (/^\d{0,2}$/.test(value)) { // Allow only up to two digits
            setDistance(value);
            setDistanceError(""); // Clear error if valid
        } else {
            setDistanceError("Please enter a valid number (up to 99 miles).");
        }
    };

    const handleGameTypeChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z\s]*$/.test(value)) { // Allow only letters and spaces
            setGameType(value);
            setGameTypeError(""); // Clear error if valid
        } else {
            setGameTypeError("Please enter only letters and spaces for game type.");
        }
    };

    // step 1: Receive User Input and Create Hunt
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
            startLatitude: currentLocation[0].toString(),   
            startLongitude: currentLocation[1].toString(),  
            distance: distance.toString(),                 
            numSites: numSites.toString(),                  
            gameType: gameType.toLowerCase(),  
        };

        console.log("Game selections to be sent:", gameSelections); 

        try {
            const response = await fetch('https://games-afoot.onrender.com/hunts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(gameSelections),
            });

            if (!response.ok) {
                throw new Error('Failed to create hunt');
            }
    
            const huntData = await response.json();
            console.log('Hunt created with ID:', huntData.id);
            
            await generateLocations(huntData.id);
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    const generateLocations = async (huntId) => {
        try {
            const response = await fetch(`https://games-afoot.onrender.com/hunts/${huntId}/generate_locations`, {
                method: 'POST',
            });
    
            if (!response.ok) {
                throw new Error('Failed to generate locations');
            }
    
            console.log('Locations generated for hunt ID:', huntId);
    
            // Step 2: Generate Location Data
            await fetchLocations(huntId);
        } catch (error) {
            console.error('Error generating locations:', error);
        }
    };

    const fetchLocations = async (huntId) => {
        try {
            const response = await fetch(`https://games-afoot.onrender.com/hunts/${huntId}/locations`);
    
            if (!response.ok) {
                throw new Error('Failed to fetch locations');
            }
    
            const locationsData = await response.json();
            console.log('Fetched locations for hunt ID:', huntId, locationsData);
    
            // step 3: get locations by id; 
        } catch (error) {
            console.error('Error fetching locations:', error);
        }
    };
    
    return (
        <div className="input-form">
            <h2 onClick={() => setIsFormVisible(!isFormVisible)} className="toggle-header">
                Enter Details Below
                <span className={`arrow ${isFormVisible ? "up" : "down"}`}></span>
            </h2>
            {isFormVisible && (
                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="distance">Distance (in miles):</label>
                        <input
                            type="text"
                            id="distance"
                            value={distance}
                            onChange={handleDistanceChange}
                            placeholder="Enter distance"
                            maxLength="2"
                        />
                        {distanceError && <p style={{ color: 'red' }}>{distanceError}</p>}
                    </div>
                    <div>
                        <label htmlFor="numSites">Number of Sites:</label>
                        <select
                            id="numSites"
                            value={numSites}
                            onChange={(e) => setNumSites(e.target.value)}
                        >
                            <option value="">Select Number of Sites</option>
                            {[...Array(10).keys()].map(num => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1} site{num > 0 ? 's' : ''}
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
                            onChange={handleGameTypeChange}
                            placeholder="Enter game type"
                        />
                        {gameTypeError && <p style={{ color: 'red' }}>{gameTypeError}</p>}
                    </div>
                    <div>
                        <p>Latitude: {currentLocation[0]}</p>
                        <p>Longitude: {currentLocation[1]}</p>
                    </div>
                    <button type="submit">
                        Start Game
                    </button>
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