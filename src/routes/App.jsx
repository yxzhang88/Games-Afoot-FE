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
import AppContent from "../components/AppContent";

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
                                <AppContent />
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
