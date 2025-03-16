"use client";
import { render } from "@testing-library/react";
import Step from "./Step";


describe("Step component", () => {
    it("renders step component", () => {
        const { getByText } = render(<Step step={1} title="Step 1" description="Customers select PayLater at checkout and pay over time. No interest, no fees." />);
        expect(getByText("Step 1")).toBeInTheDocument();
        expect(getByText("Customers select PayLater at checkout and pay over time. No interest, no fees.")).toBeInTheDocument();
    });

    it("renders step component with different props", () => {
        const { getByText } = render(<Step step={2} title="Step 2" description="We pay you upfront, so you can ship the order right away." />);
        expect(getByText("Step 2")).toBeInTheDocument();
        expect(getByText("We pay you upfront, so you can ship the order right away.")).toBeInTheDocument();
    });
    it("renders step number correctly", () => {
        const { getByText } = render(<Step step={3} title="Step 3" description="Your customer pays us over time, while you get paid upfront." />);
        expect(getByText("3")).toBeInTheDocument();
    });
});