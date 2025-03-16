"use client"
import React from 'react';
import { render, screen } from '@testing-library/react';
import Rating from './Rating';


describe("Rating Component", () => {
    it("renders without crashing", () => {
        render(<Rating source="Trustpilot" label="Excellent" />);
        expect(screen.getByText("Excellent")).toBeInTheDocument();
    });

    it("renders the source", () => {
        render(<Rating source="Trustpilot" label="Excellent" />);
        expect(screen.getByText("Trustpilot")).toBeInTheDocument();
    });
});

