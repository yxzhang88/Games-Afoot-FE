import { Box, Button, Typography } from '@mui/material';
import PropTypes from 'prop-types';

const ProgressWindow = ({ currentSpot, totalSpots, userLocation, checkLocation, distance, hint, getMoreHints }) => {
    // Ensure userLocation is correctly structured
    if (!userLocation || typeof userLocation.latitude !== 'number' || typeof userLocation.longitude !== 'number') {
        console.error('Invalid userLocation prop');
        return null; // Or return some fallback UI
    }

    return (
        <Box 
            sx={{ 
                p: 2, 
                border: '1px solid #ccc', 
                borderRadius: 2, 
                width: '100%', 
                maxWidth: 300, 
                minWidth: 250,
                backgroundColor: '#f9f9f9',
                mx: 'auto', // center align horizontally
            }}
        >
            <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle1">Current Spot: {currentSpot}/{totalSpots}</Typography>
            </Box>
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">
                    Latitude: {userLocation.latitude.toFixed(6)}, Longitude: {userLocation.longitude.toFixed(6)}
                </Typography>
                <Button 
                    variant="contained" 
                    sx={{ ml: 2, fontSize: '0.75rem', padding: '4px 8px' }} 
                    onClick={checkLocation}
                >
                    Check My Location
                </Button>
            </Box>
            <Box sx={{ mb: 2 }}>
                <Typography variant="body1">Distance from Target: {distance}</Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body1">Hint: {hint}</Typography>
                <Button variant="contained" size="small" sx={{ ml: 2 }} onClick={getMoreHints}>
                    More Hints
                </Button>
            </Box>
        </Box>
    );
};

ProgressWindow.propTypes = {
    currentSpot: PropTypes.number.isRequired,
    totalSpots: PropTypes.number.isRequired,
    userLocation: PropTypes.shape({
        latitude: PropTypes.number.isRequired,
        longitude: PropTypes.number.isRequired,
    }).isRequired,
    checkLocation: PropTypes.func.isRequired,
    distance: PropTypes.string.isRequired,
    hint: PropTypes.string.isRequired,
    getMoreHints: PropTypes.func.isRequired,
};

export default ProgressWindow;
