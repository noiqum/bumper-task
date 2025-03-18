"use client";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RegisterForm from "./RegisterForm";
import { ModalProvider } from "@/contexts/ModalContext";



describe("RegisterForm Component", () => {
    it("renders without crashing", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        expect(screen.getByTestId("register-form")).toBeInTheDocument();
    });

    it("renders the name input field", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const nameInput = screen.getByRole("textbox", { name: /name/i });
        expect(nameInput).toBeInTheDocument();
        expect(nameInput).toHaveAttribute("id", "name");
    });

    it("renders the company input field", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const companyInput = screen.getByRole("textbox", { name: /company/i });
        expect(companyInput).toBeInTheDocument();
        expect(companyInput).toHaveAttribute("id", "company");
    });

    it("renders the mobile phone input field", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const mobilePhoneInput = screen.getByRole("textbox", { name: /mobile phone/i });
        expect(mobilePhoneInput).toBeInTheDocument();
        expect(mobilePhoneInput).toHaveAttribute("id", "mobile_phone");
    });

    it("renders the email address input field", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const emailAddressInput = screen.getByRole("textbox", { name: /email address/i });
        expect(emailAddressInput).toBeInTheDocument();
        expect(emailAddressInput).toHaveAttribute("id", "email_address");
    });

    it("renders the postcode input field", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const postcodeInput = screen.getByRole("textbox", { name: /postcode/i });
        expect(postcodeInput).toBeInTheDocument();
        expect(postcodeInput).toHaveAttribute("id", "postcode");
    });

    it("renders the pay later checkbox", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const payLaterCheckbox = screen.getByRole("checkbox", { name: /pay later/i });
        expect(payLaterCheckbox).toBeInTheDocument();
        expect(payLaterCheckbox).toHaveAttribute("id", "pay_later");
    });

    it("renders the pay now checkbox", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const payNowCheckbox = screen.getByRole("checkbox", { name: /pay now/i });
        expect(payNowCheckbox).toBeInTheDocument();
        expect(payNowCheckbox).toHaveAttribute("id", "pay_now");
    });

    it("renders the submit button", () => {
        render(<ModalProvider>
            <RegisterForm />
        </ModalProvider>);
        const submitButton = screen.getByRole("button", { name: /register/i });
        expect(submitButton).toBeInTheDocument();
    });

});

describe('RegisterForm validation tests', () => {
    it("renders the name required error message", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        const submitButton = screen.getByRole("button", { name: /register/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
        });
    });

    it("validates name format with alphanumeric characters only", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        const nameInput = screen.getByRole("textbox", { name: /name/i });
        fireEvent.change(nameInput, { target: { value: 'test@!' } });

        fireEvent.blur(nameInput);

        await waitFor(async () => {
            expect(screen.getByText(/name should only contain alphanumeric characters/i)).toBeInTheDocument();
        });
    });

    it("validates mobile phone format", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        const phoneInput = screen.getByLabelText(/mobile phone/i);
        fireEvent.change(phoneInput, { target: { value: '1234567890' } }); // Invalid format - should start with 07
        fireEvent.blur(phoneInput);

        await waitFor(() => {
            expect(screen.getByText(/mobile phone must start with 07 followed by 9 digits/i)).toBeInTheDocument();
        });
    });

    it("validates email format", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        const emailInput = screen.getByLabelText(/email address/i);

        // Use fireEvent.change instead of userEvent.type
        fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

        // Now check the value
        expect(emailInput).toHaveValue('invalid-email');

        fireEvent.blur(emailInput);

        await waitFor(() => {
            expect(screen.getByText(/must be a valid email/i)).toBeInTheDocument();
        });
    });

    it("validates that at least one payment option is selected", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        // Fill in all required fields except payment options
        const nameInput = screen.getByLabelText(/name/i);
        const companyInput = screen.getByLabelText(/company/i);
        const phoneInput = screen.getByLabelText(/mobile phone/i);
        const emailInput = screen.getByLabelText(/email address/i);
        const postcodeInput = screen.getByLabelText(/postcode/i);

        fireEvent.change(nameInput, { target: { value: 'John Doe' } });
        fireEvent.change(companyInput, { target: { value: 'ABC Company' } });
        fireEvent.change(phoneInput, { target: { value: '0712345678' } });
        fireEvent.change(emailInput, { target: { value: 'M8tD1@example.com' } });
        fireEvent.change(postcodeInput, { target: { value: '1234' } });

        // Submit without selecting either payment option
        const submitButton = screen.getByRole("button", { name: /register/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/at least one payment option must be selected/i)).toBeInTheDocument();
        });
    });

    it("shows all field validation errors on submit", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        const submitButton = screen.getByRole("button", { name: /register/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText(/name is required/i)).toBeInTheDocument();
            expect(screen.getByText(/company is required/i)).toBeInTheDocument();
            expect(screen.getByText(/mobile phone is required/i)).toBeInTheDocument();
            expect(screen.getByText(/email address is required/i)).toBeInTheDocument();
            expect(screen.getByText(/postcode is required/i)).toBeInTheDocument();
            expect(screen.getByText(/at least one payment option must be selected/i)).toBeInTheDocument();
        });
    });

    it("validates field border colors when fields are touched", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        // Test valid input changes border color to green
        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, 'Valid Name');
        fireEvent.blur(nameInput);

        await waitFor(() => {
            const inputContainer = nameInput.closest('div');
            expect(inputContainer?.querySelector('input')).toHaveClass('border-primary-green');
        });

        // Test invalid input changes border color to red
        const emailInput = screen.getByLabelText(/email address/i);
        userEvent.type(emailInput, 'invalid-email');
        fireEvent.blur(emailInput);

        await waitFor(() => {
            const inputContainer = emailInput.closest('div');
            expect(inputContainer?.querySelector('input')).toHaveClass('border-primary-red');
        });
    });

    it("displays appropriate icons based on field validation state", async () => {
        render(
            <ModalProvider>
                <RegisterForm />
            </ModalProvider>
        );

        // Test check icon appears for valid input
        const nameInput = screen.getByLabelText(/name/i);
        userEvent.type(nameInput, 'Valid Name');
        fireEvent.blur(nameInput);

        await waitFor(() => {
            const checkIcon = screen.getAllByAltText('Check')[0];
            expect(checkIcon).toBeInTheDocument();
        });

        // Test warning icon appears for invalid input
        const emailInput = screen.getByLabelText(/email address/i);
        userEvent.type(emailInput, 'invalid-email');
        fireEvent.blur(emailInput);

        await waitFor(() => {
            const warningIcon = screen.getAllByAltText('Warning')[0];
            expect(warningIcon).toBeInTheDocument();
        });
    });
});