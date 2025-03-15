"use client";
import Button from "./Button";
import { render, screen } from "@testing-library/react";



describe("Button Component", () => {
    it("renders without crashing", () => {
        render(<Button label="Register" type="green-base" />);
        expect(screen.getByText("Register")).toBeInTheDocument();
    });

    it("applies correct class for green-base type", () => {
        const { container } = render(<Button label="Register" type="green-base" />);
        expect(container.firstChild).toHaveClass("bg-primary-green");
        expect(container.firstChild).toHaveClass("text-primary-black");

    });

});


