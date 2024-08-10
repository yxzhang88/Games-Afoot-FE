import "./ScrollButton.css";
import { useState, useEffect } from "react";
import ArrowCircleUpIcon from '@mui/icons-material/ArrowCircleUp';

export default function ScrollButton() {
    const [isVisible, setIsVisible] = useState(false);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' 
        });
    }

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        }
    }, []);

    return (
        <ArrowCircleUpIcon 
            className={`scroll-button ${isVisible ? '' : 'not-visible'}`}
            onClick={scrollToTop}
            sx={{ fontSize: 55 }}
        />
    )
}