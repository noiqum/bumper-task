"use client";

import React from "react";
import { render, screen } from "@testing-library/react";
import Register from "./page";
import { ModalProvider } from "@/contexts/ModalContext";

// Mock useRouter
jest.mock("next/navigation", () => ({
    useRouter: () => ({
        back: jest.fn(),
    }),
}));

describe("Register Page", () => {
    it("renders without crashing", () => {
        render(
            <ModalProvider>
                <Register />
            </ModalProvider>);
        expect(screen.getByTestId("register-page")).toBeInTheDocument();
    });
});
