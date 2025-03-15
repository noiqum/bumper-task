import React from 'react';

type ButtonType = "green-base" | "green-long-rounded";

interface ButtonProps {
    label: string;
    onClick?: () => void;
    type: "green-base" | "green-long-rounded";
    disabled?: boolean;
    loading?: boolean;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type, disabled }) => {
    const typeClass: { [key in ButtonType]: string } = {
        "green-base": "bg-primary-green text-primary-black text-sm lg:text-lg lg:leading-6 leading-5 rounded-sm px-3 py-1 leading-5 border border-primary-black border-solid cursor-pointer hover:text-white hover:shadow-md hover:scale-105 ",
        "green-long-rounded": "bg-primary-green text-white rounded-full"
    }

    return (
        <button onClick={onClick} disabled={disabled} className={typeClass[type]}>
            {label}
        </button>
    );
};

export default Button;

