import React, { useState, useRef, useEffect } from 'react';

interface FormSelectProps {
    id: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
    baseClass: string;
    options: { value: string; label: string }[];
    icon?: React.ReactNode;
    fieldIcon?: React.ReactNode;
    getBorderColorClass: () => string;
    handleBlur: (field: string) => void;
    onChange?: (value: string) => void;
    placeholder?: string;
}

const FormSelect: React.FC<FormSelectProps> = ({
    id,
    label,
    register,
    errors,
    baseClass,
    options,
    getBorderColorClass,
    handleBlur,
    icon,
    fieldIcon,
    onChange,
    placeholder
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedOption, setSelectedOption] = useState<string>('');
    const [displayValue, setDisplayValue] = useState<string>(placeholder || '');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [filteredOptions, setFilteredOptions] = useState(options);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const searchInputRef = useRef<HTMLInputElement>(null);
    const hiddenInputRef = useRef<HTMLInputElement>(null);

    // Filter options when search term changes
    useEffect(() => {
        if (searchTerm) {
            setFilteredOptions(
                options.filter(option =>
                    option.label.toLowerCase().includes(searchTerm.toLowerCase())
                )
            );
        } else {
            setFilteredOptions(options);
        }
    }, [searchTerm, options]);

    // Focus search input when dropdown opens
    useEffect(() => {
        if (isOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isOpen]);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    // Register the hidden input with react-hook-form
    const { ref, ...rest } = register(id);

    // Handle option selection
    const handleSelectOption = (value: string, label: string) => {
        setSelectedOption(value);
        setDisplayValue(label);
        setIsOpen(false);
        setSearchTerm('');

        // Update the hidden input value
        if (hiddenInputRef.current) {
            hiddenInputRef.current.value = value;

            // Trigger onChange to validate
            const event = new Event('input', { bubbles: true });
            hiddenInputRef.current.dispatchEvent(event);
        }

        // Call the custom onChange if provided
        if (onChange) {
            onChange(value);
        }

        // Trigger blur to mark as touched
        handleBlur(id);
    };

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setSearchTerm('');
        }
    };

    return (
        <div className="form-group">
            <label id={`${id}-label`} htmlFor={id} className="flex items-end text-base leading-5 font-extrabold text-gray-700 mb-2 gap-1">
                {icon && <span className="mr-2">{icon}</span>} {label}
            </label>

            {/* Hidden input for form handling */}
            <input
                type="hidden"
                id={id}
                {...rest}
                ref={(e) => {
                    ref(e);
                    hiddenInputRef.current = e;
                }}
            />

            {/* Custom select container */}
            <div className="relative" ref={dropdownRef}>
                {/* Select trigger button */}
                <div
                    role="combobox"
                    aria-labelledby={`${id}-label`}
                    aria-haspopup="listbox"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-listbox`}
                    className={`${baseClass} ${getBorderColorClass()} flex items-center justify-between cursor-pointer`}
                    onClick={toggleDropdown}
                    tabIndex={0}
                >
                    <span className={`${!selectedOption ? 'text-gray-400' : ''}`}>
                        {displayValue}
                    </span>
                    <div className="flex items-center">
                        {fieldIcon && <span className="mr-2">{fieldIcon}</span>}
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
                        >
                            <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </div>
                </div>

                {/* Dropdown options with search */}
                {isOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white rounded-md shadow-lg border border-gray-200 overflow-hidden">
                        {/* Search input */}
                        <div className="p-2 border-b border-gray-200">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search..."
                                className="w-full p-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-green focus:border-transparent"
                                onClick={(e) => e.stopPropagation()}
                            />
                        </div>

                        {/* Options list */}
                        <div className="max-h-60 overflow-y-auto">
                            {filteredOptions.length > 0 ? (
                                filteredOptions.map((option) => (
                                    <div
                                        key={option.value}
                                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer transition-colors duration-150"
                                        onClick={() => handleSelectOption(option.value, option.label)}
                                    >
                                        {option.label}
                                    </div>
                                ))
                            ) : (
                                <div className="px-4 py-2 text-sm text-gray-500">
                                    No options found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {errors[id] && <p className="text-primary-red text-sm mt-1">{errors[id].message}</p>}
        </div>
    );
};

export default FormSelect;