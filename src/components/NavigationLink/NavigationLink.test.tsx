import NavigationLink from "./NavigationLink";
import { render, screen } from "@testing-library/react";


describe("NavigationLink", () => {
    it("renders the link with the correct label", () => {
        render(<NavigationLink to="/about" label="About" active />);
        expect(screen.getByText("About")).toBeInTheDocument();
    });
    it("render the link with the correct href", () => {
        render(<NavigationLink to="/about" label="About" active />);
        const link = screen.getByText("About").closest("a");
        expect(link).toHaveAttribute("href", "/about");
    });
    it("renders the link with the active state", () => {
        render(<NavigationLink to="/about" label="About" active />);
        expect(screen.getByTestId("bottom-element")).toBeInTheDocument();
    });
});

