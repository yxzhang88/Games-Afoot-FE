import { BrowserRouter, Routes, Route } from "react-router-dom";
import AboutGame from "../components/AboutGame";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./App.css"; // General styles
import AppContent from "../components/AppContent";
import "../components/MapStyles.css";
import "../components/AppContent.css"; // General styles

const App = () => {
    return (
        <div>
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
                    </Routes>
                </div>
            </BrowserRouter>
            <Footer className="footer"/>
        </div>
    );
};

export default App;
