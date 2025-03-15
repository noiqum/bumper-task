"use client";
import Button from "./Button";
import { render, screen } from "@testing-library/react";

//mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

// mock icon image
jest.mock("../../../public/assets/svg/exit.svg", () => "exit-icon");

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

    it("render icon when passed", () => {
        render(<Button label="Register" type="green-base" icon={<img src="exit-icon" alt="exit" />} />);
        expect(screen.getByAltText("exit")).toBeInTheDocument();
    });
});


