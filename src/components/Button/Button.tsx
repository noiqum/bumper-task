import React from 'react';

type ButtonType = "green-base" | "green-long-rounded" | "dark-base";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
    className?: string;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type, disabled, icon, className }) => {
    const baseClass = "flex items-center text-sm lg:text-lg lg:leading-6 leading-5 border border-solid cursor-pointer hover:shadow-md hover:scale-105 ";
    const sharedGreenClass = "bg-primary-green text-primary-black border-primary-black hover:text-white";

    const typeClass: { [key in ButtonType]: string } = {
        "green-base": `${baseClass} ${sharedGreenClass} rounded-sm px-3 py-1 ${className ? className : ""}`,
        "green-long-rounded": `${baseClass} ${sharedGreenClass} rounded-full px-4 py-3 whitespace-nowrap ${className ? className : ""}`,
        "dark-base": `${baseClass} items-center bg-primary-black text-white rounded-sm px-3 py-1 border-white ${className ? className : ""}`,
    };

    return (
        <button onClick={onClick} disabled={disabled} className={typeClass[type]}>
            {label}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;

