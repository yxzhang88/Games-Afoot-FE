import PropTypes from "prop-types";

const Progress = ({
    currentClue,
    currentLocation,
    checkProximity,
    distanceToTarget,
    nextClue,
}) => {
    console.log("Progress component:", {
        currentClue,
        currentLocation,
        checkProximity,
        distanceToTarget,
        nextClue,
    });

    return (
        <div className="other-content">
            <h2>Progress</h2>
            <div>
                <div style={{ display: "flex", alignItems: "center" }}>
                    <h4 style={{ margin: 0, marginRight: "10px" }}>
                        Your location:
                    </h4>
                    <button type="button" onClick={checkProximity}>
                        Check Location
                    </button>
                </div>
                    <div>
                        <p>Latitude: {currentLocation[0]}</p>
                        <p>Longitude: {currentLocation[1]}</p>
                    </div>
            </div>
            <div>
                <span>
                    Distance to Target: {distanceToTarget.toFixed(2)} km
                </span>
            </div>
            <div>
                <span>Current Clue: {currentClue}</span>
            </div>
            <button type="button" onClick={nextClue}>
                Next Clue
            </button>
        </div>
    );
};

Progress.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentClue: PropTypes.string.isRequired,
    checkProximity: PropTypes.func.isRequired,
    distanceToTarget: PropTypes.number.isRequired,
    nextClue: PropTypes.func.isRequired,
};

export default Progress;

// how progress table should look like

// [
//     {
//         "id": 1,
//         "userId": 1,
//         "huntId": 1,
//         "currentLocationIndex": 2,
//         "visitedLocations": [
//             1,
//             2,
//             3
//         ],
//         "nextHint": "Go to the corner"
//     },
//     {
//         "id": 2,
//         "userId": 1,
//         "huntId": 2,
//         "currentLocationIndex": 0,
//         "visitedLocations": [
//             1
//         ],
//         "nextHint": "Find the gold statue"
//     },
//     {
//         "id": 3,
//         "userId": 2,
//         "huntId": 3,
//         "currentLocationIndex": 3,
//         "visitedLocations": [
//             1,
//             2,
//             3,
//             4
//         ],
//         "nextHint": "Cross the bridge"
//     }
// ]
