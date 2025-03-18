"use client";
import Button from "./Button";
import { render, screen } from "@testing-library/react";

//mock next/image
jest.mock("next/image", () => ({
    __esModule: true,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

    it("applies className prop if provided", () => {
        render(<Button label="Register" type="green-base" className="custom-class" />);
        expect(screen.getByText("Register")).toHaveClass("custom-class");
    });

    it("applies loading class when loading prop is true", () => {
        render(<Button label="Register" type="green-base" loading />);
        expect(screen.getByText("Register")).toHaveClass("animate-pulse cursor-wait pointer-events-none");
    })
});


