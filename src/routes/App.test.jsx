import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import Instruction from "../components/Instruction";

describe("Display title", () => {
    it("displays the title Game Instruction ", () => {
        render(<Instruction />);
        const instructionTitle = screen.getByText(/Game Instruction/i);
        expect(instructionTitle).toBeInTheDocument();

        screen.debug();
    });
});
