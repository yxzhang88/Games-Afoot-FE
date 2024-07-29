import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Progress = ({ currentLocation, gameData }) => {
    const currentGame = gameData[0];
    const currentLocationIndex = currentGame.currentLocationIndex;
    const visitedLocations = currentGame.visitedLocations;
    const nextHint = currentGame.nextHint;
    const [hintIndex, setHintIndex] = useState(0);
    const [hint, setHint] = useState(nextHint);

    //logic to show one hint at a time
    useEffect(() => {
        const interval = setInterval(() => {
            if (hintIndex < nextHint.length - 1) {
                setHint(nextHint[hintIndex]);
                setHintIndex(hintIndex + 1);
            }
        }, 10000); //show hint every 10 seconds for now
        return () => clearInterval(interval);
    }, [hintIndex, nextHint]);

    return (
        <div className="other-content">
            <h2>Progress</h2>
            <div>
                <span>Current Location: {currentLocation}</span>
            </div>
            <button type="submit">Check Location</button>
            <div>
                <span>Distance in Miles: 3 miles</span>
            </div>
            <div>
                <span>Hint: go to the corner</span>
                {/* show one hint at a time */}
            </div>
        </div>
    );
};

Progress.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    gameData: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number,
            userId: PropTypes.number,
            huntId: PropTypes.number,
            currentLocationIndex: PropTypes.number,
            visitedLocations: PropTypes.arrayOf(PropTypes.number),
            nextHint: PropTypes.string,
        })
    ).isRequired,
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
