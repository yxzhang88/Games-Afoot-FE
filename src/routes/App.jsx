import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "../components/AboutGame";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Instruction from "../components/Instruction";
import "./App.css"; // General styles
import AppContent from "../components/AppContent";
import "../components/MapStyles.css";
import "../components/AppContent.css"; // General styles

const App = () => {
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
                    <Route path="aboutgame" element={<AboutGame />} />
                    <Route path="instruction" element={<Instruction />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
};

export default App;
