import PropTypes from "prop-types";
import kmToMi from "../utilityFunctions/kmToMi";
import { Button } from "@mui/material";

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
    milesOrKm,
    setMilesOrKm,
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

    const distanceToTargetInMiles = kmToMi(distanceToTarget);
    const handleKmToMi = () => {
        setMilesOrKm(milesOrKm === 'miles' ? 'km' : 'miles');
    }

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
                {/* <p>Latitude: {currentLocation[0]}</p>
                <p>Longitude: {currentLocation[1]}</p> */}
                <div>
                    {currentLocation && currentLocation.length > 1 ? (
                        <>
                            <p>Latitude: {currentLocation[0]}</p>
                            <p>Longitude: {currentLocation[1]}</p>
                        </>
                    ) : (
                        <p>Location data is not available.</p>
                    )}
                </div>
            </div>
            <div>
                <span>
                    Distance to Target: {milesOrKm == "miles" ? distanceToTargetInMiles.toFixed(2) : distanceToTarget.toFixed(2)}
                    <Button onClick={handleKmToMi} size="small" sx={{ mx: 1, px: .25, minWidth:0}} variant="contained">{milesOrKm}</Button>                
                </span>
            </div>
            <div>
                <span className="clue-name">Current Clue: {currentClue}</span>
            </div>
            <button type="button" onClick={nextClue}>
                Next Clue
            </button>
            {locationNameVisible && (
                <div className="location-name">
                    You have reached: {locationName}
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
    milesOrKm: PropTypes.string.isRequired,
    setMilesOrKm: PropTypes.func.isRequired,
};

export default Progress;
