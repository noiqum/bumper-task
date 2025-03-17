"use client";
import { render, screen } from "@testing-library/react";
import RegisterForm from "./RegisterForm";


describe("RegisterForm Component", () => {
    it("renders without crashing", () => {
        render(<RegisterForm />);
        expect(screen.getByTestId("register-form")).toBeInTheDocument();
    });

    it("renders the name input field", () => {
        render(<RegisterForm />);
        const nameInput = screen.getByRole("textbox", { name: /name/i });
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute("id", "name");
    });

    it("renders the company input field", () => {
        render(<RegisterForm />);
        const companyInput = screen.getByRole("textbox", { name: /company/i });
        expect(companyInput).toBeInTheDocument();
        expect(companyInput).toHaveAttribute("id", "company");
    });

    it("renders the mobile phone input field", () => {
        render(<RegisterForm />);
        const mobilePhoneInput = screen.getByRole("textbox", { name: /mobile phone/i });
        expect(mobilePhoneInput).toBeInTheDocument();
        expect(mobilePhoneInput).toHaveAttribute("id", "mobile_phone");
    });

    it("renders the email address input field", () => {
        render(<RegisterForm />);
        const emailAddressInput = screen.getByRole("textbox", { name: /email address/i });
        expect(emailAddressInput).toBeInTheDocument();
        expect(emailAddressInput).toHaveAttribute("id", "email_address");
    });

    it("renders the postcode input field", () => {
        render(<RegisterForm />);
        const postcodeInput = screen.getByRole("textbox", { name: /postcode/i });
        expect(postcodeInput).toBeInTheDocument();
        expect(postcodeInput).toHaveAttribute("id", "postcode");
    });

    it("renders the pay later checkbox", () => {
        render(<RegisterForm />);
        const payLaterCheckbox = screen.getByRole("checkbox", { name: /pay later/i });
        expect(payLaterCheckbox).toBeInTheDocument();
        expect(payLaterCheckbox).toHaveAttribute("id", "pay_later");
    });

    it("renders the pay now checkbox", () => {
        render(<RegisterForm />);
        const payNowCheckbox = screen.getByRole("checkbox", { name: /pay now/i });
        expect(payNowCheckbox).toBeInTheDocument();
        expect(payNowCheckbox).toHaveAttribute("id", "pay_now");
    });
});