import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import MapContainer from "../components/MapContainer";
import AboutUs from "../components/AboutUs";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Instruction from "../components/Instruction";
import InputForm from "../components/InputForm";
import "./App.css"; // General styles
import "../components/MapStyles.css"; // Map-specific styles

const App = () => {
    const [currentLocation, setCurrentLocation] = useState([51.505, -0.09]);

    const updateLocation = (location) => {
        setCurrentLocation(location);
    };
    return (
        <BrowserRouter>
            <Navbar />
            <div className="app-container">
                <Routes>
                    <Route
                        path="/"
                        element={
                            <div>
                                <div className="content">
                                    <div className="other-content">
                                        <InputForm
                                            currentLocation={currentLocation}
                                        />
                                    </div>
                                    <div className="map-container">
                                        <MapContainer
                                            updateLocation={updateLocation}
                                        />
                                    </div>
                                </div>
                            </div>
                        }
                    />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="instruction" element={<Instruction />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
