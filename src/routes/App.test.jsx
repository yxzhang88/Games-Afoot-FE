import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import InstructionPopUp from "../components/InstructionPopUp";
import AppContent from "../components/AppContent";

describe("Display title", () => {
    it("displays the title Game Instruction ", () => {
        render(<InstructionPopUp />);
        const instructionTitle = screen.getByText(/Game Instructions/i);
        expect(instructionTitle).toBeInTheDocument();

        screen.debug();
    });

    it("renders the map component", () => {
        const { container } = render(<AppContent />);
        const map = container.querySelector(".map-container");
        expect(map).toBeInTheDocument();

        screen.debug();
    });
});
