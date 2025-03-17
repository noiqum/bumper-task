"use client";

import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./page";
import { useRouter } from "next/navigation";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        back: jest.fn(),
    }),
}));

describe("Register Page", () => {
    it("renders without crashing", () => {
        render(<Register />);
        expect(screen.getByTestId("register-page")).toBeInTheDocument();
    });
});
