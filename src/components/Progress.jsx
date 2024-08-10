import PropTypes from "prop-types";

const Progress = ({
    currentClue,
    currentLocation,
    checkProximity,
    distanceToTarget,
    nextClue,
    clueDescription,
    descriptionVisible,
    locationName,
    locationNameVisible,
}) => {
    // console.log("Progress component:", {
    //     currentClue,
    //     currentLocation,
    //     checkProximity,
    //     distanceToTarget,
    //     nextClue,
    //     clueDescription,
    //     descriptionVisible,
    //     locationName,
    //     locationNameVisible,
    // });

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
                <p>Latitude: {currentLocation[0]}</p>
                <p>Longitude: {currentLocation[1]}</p>
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
            {locationNameVisible && (
                <div className="location-name">
                    Location Name: {locationName}
                </div>
            )}
            {descriptionVisible && (
                <div className="location-description">
                    Location Description: {clueDescription}
                </div>
            )}
        </div>
    );
};

Progress.propTypes = {
    currentLocation: PropTypes.arrayOf(PropTypes.number).isRequired,
    currentClue: PropTypes.string.isRequired,
    checkProximity: PropTypes.func.isRequired,
    distanceToTarget: PropTypes.number.isRequired,
    nextClue: PropTypes.func.isRequired,
    clueDescription: PropTypes.string.isRequired,
    descriptionVisible: PropTypes.bool.isRequired,
    locationName: PropTypes.string.isRequired,
    locationNameVisible: PropTypes.bool.isRequired,
};

export default Progress;
