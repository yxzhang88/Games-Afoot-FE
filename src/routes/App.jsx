import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginForm from "../userauthentication/LoginForm";
import AboutUs from "../components/AboutUs";
import Navbar from "../components/Navbar";
import "./App.css";
import Footer from "../components/Footer";
import Instruction from "../components/Instruction";

function App() {
    return (
        <BrowserRouter>
            <div className="appContainer">
                <Navbar />
                <Routes>
                    <Route path="/" element={<LoginForm />} />
                    <Route path="aboutus" element={<AboutUs />} />
                    <Route path="instruction" element={<Instruction />} />
                </Routes>
            </div>
            <Footer />
        </BrowserRouter>
    );
}

export default App;
