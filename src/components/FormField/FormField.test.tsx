"use client";
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FormField from './FormField';

describe('FormField Component', () => {
    const defaultProps = {
        id: 'test-field',
        label: 'Test Label',
        register: jest.fn().mockReturnValue({}),
        errors: {},
        baseClass: 'base-class',
        type: 'text',
        getBorderColorClass: jest.fn().mockReturnValue('border-gray-300'),
        handleBlur: jest.fn()
    };

    it('renders the component with required props', () => {
        render(<FormField {...defaultProps} />);

        expect(screen.getByLabelText('Test Label')).toBeInTheDocument();
        expect(screen.getByRole('textbox')).toHaveAttribute('id', 'test-field');
        expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
    });

    it('displays the label correctly', () => {
        render(<FormField {...defaultProps} />);

        expect(screen.getByText('Test Label')).toBeInTheDocument();
    });

    it('applies the correct classes', () => {
        render(<FormField {...defaultProps} />);

        const input = screen.getByRole('textbox');
        expect(input).toHaveClass('base-class');
        expect(input).toHaveClass('border-gray-300');
    });

    it('displays error message when present', () => {
        const propsWithError = {
            ...defaultProps,
            errors: { 'test-field': { message: 'This field is required' } }
        };

        render(<FormField {...propsWithError} />);

        expect(screen.getByText('This field is required')).toBeInTheDocument();
    });

    it('displays placeholder when provided', () => {
        render(<FormField {...defaultProps} placeholder="Enter value here" />);

        expect(screen.getByPlaceholderText('Enter value here')).toBeInTheDocument();
    });

    it('calls onChange when input value changes', () => {
        const onChange = jest.fn();
        render(<FormField {...defaultProps} onChange={onChange} />);

        fireEvent.change(screen.getByRole('textbox'), { target: { value: 'new value' } });
        expect(onChange).toHaveBeenCalled();
    });

    it('renders with icon when provided', () => {
        const icon = <span data-testid="test-icon">Icon</span>;
        render(<FormField {...defaultProps} icon={icon} />);

        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
    });

    it('renders with field icon when provided', () => {
        const fieldIcon = <span data-testid="test-field-icon">Field Icon</span>;
        render(<FormField {...defaultProps} fieldIcon={fieldIcon} />);

        expect(screen.getByTestId('test-field-icon')).toBeInTheDocument();
    });



    it('renders correct input type when specified', () => {
        render(<FormField {...defaultProps} type="password" />);

        expect(screen.getByLabelText('Test Label')).toHaveAttribute('type', 'password');
    });
});