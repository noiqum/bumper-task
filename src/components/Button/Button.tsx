import { Span } from 'next/dist/trace';
import React from 'react';

type ButtonType = "green-base" | "green-long-rounded" | "dark-base";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type: ButtonType;
    disabled?: boolean;
    loading?: boolean;
    icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type, disabled, icon }) => {
    const typeClass: { [key in ButtonType]: string } = {
        "green-base": "flex bg-primary-green text-primary-black text-sm lg:text-lg lg:leading-6 leading-5 rounded-sm px-3 py-1 leading-5 border border-primary-black border-solid cursor-pointer hover:text-white hover:shadow-md hover:scale-105 ",
        "green-long-rounded": "bg-primary-green text-white rounded-full",
        "dark-base": "flex items-center border-white   bg-primary-black text-white text-sm rounded-sm px-3 py-1 leading-5 border  border-solid cursor-pointer  "
    }

    return (
        <button onClick={onClick} disabled={disabled} className={typeClass[type]}>
            {label}
            {icon && <span className="ml-2">{icon}</span>}
        </button>
    );
};

export default Button;

