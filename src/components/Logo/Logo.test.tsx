"use client";
import { render, screen } from '@testing-library/react';
import Logo from './Logo';

// Mock the next/image component
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />
}));

// Mock the require for the image
jest.mock('../../../public/assets/png/Logomark.png', () => 'logo-path');

describe('Logo Component', () => {
    it('renders without crashing', () => {
        render(<Logo size="medium" />);
        expect(screen.getByAltText('logo')).toBeInTheDocument();
    });

    it('applies correct class for small size', () => {
        const { container } = render(<Logo size="small" />);
        expect(container.firstChild).toHaveClass('w-19');
    });

    it('applies correct class for medium size', () => {
        const { container } = render(<Logo size="medium" />);
        expect(container.firstChild).toHaveClass('w-28');
        expect(container.firstChild).toHaveClass('lg:w-32');
    });

    it('applies correct class for large size', () => {
        const { container } = render(<Logo size="large" />);
        expect(container.firstChild).toHaveClass('w-32');
        expect(container.firstChild).toHaveClass('h-32');
    });


});