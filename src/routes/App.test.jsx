import { describe, it, expect } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import AppContent from "../components/AppContent";

describe("Display item on page", () => {
    it("renders the map component", () => {
        const { container } = render(<AppContent />);
        const map = container.querySelector(".map-container");
        expect(map).toBeInTheDocument();

        screen.debug();
    });

    it("displays the start game button", () => {
        render(<App />);
        const startGameButton = screen.getByRole("button", {
            name: /New Game/i,
        });
        expect(startGameButton).toBeInTheDocument();

        screen.debug();
    });

    it("displays the Check Distant button", () => {
        render(<App />);
        const checkLocationButton = screen.getByRole("button", {
            name: /Check Location/i,
        });
        expect(checkLocationButton).toBeInTheDocument();

        screen.debug();
    });

    it("displays the first clue when the start game button is clicked", () => {
        const { container } = render(<App />);
        const startGameButton = screen.getByRole("button", {
            name: /New Game/i,
        });
        fireEvent.click(startGameButton);

        const clueTextField = container.querySelector(".clue-name");
        expect(clueTextField).toBeInTheDocument();
        expect(clueTextField).toHaveTextContent(/.+/);

        screen.debug();
    });
});
