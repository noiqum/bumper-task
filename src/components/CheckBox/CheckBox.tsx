"use client";
import { useCallback, useRef } from "react";
import { Check, Plus } from "lucide-react"
import Warning from "../../../public/assets/svg/warning.svg";
import { FieldError } from "react-hook-form";
import Image from "next/image";
export interface CheckBoxProps {
    id: string;
    register: any;
    customClass?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    label: string;
    errors?: any;
    errorID: string
}

export const CheckBox = ({ id, register, customClass, onChange, label, errors, errorID }: CheckBoxProps) => {
    const inputRef = useRef<HTMLInputElement>(null);

    const getIcon = useCallback(() => {
        if (errors[errorID]) {
            return <Image src={Warning} alt="Warning" width={20} height={20} />;
        }
        if (inputRef.current?.checked) {
            return <Check color="white" size={20} />;
        }
        return <Plus color="black" size={20} />;

    }, [errors[errorID], inputRef]);

    const getLabelClass = useCallback(() => {
        if (errors[errorID]) {
            return "bg-white";
        }
        return inputRef.current?.checked ? "bg-primary-black text-white" : "bg-white hover:bg-[#DCE6E6] ";
    }, [errors[errorID], inputRef]);
    return (
        <div className={`flex items-center ${customClass}`}>
            <input
                {...register(id)}
                type="checkbox"
                id={id}
                className="invisible w-0 h-0 transform scale-0 bg-transparent"
                onChange={onChange}
                ref={inputRef}
            />
            <label htmlFor={id} className={`${getLabelClass()}  cursor-pointer flex items-center gap-2 border border-solid border-primary-black px-4 py-2 rounded-full`}>
                {label} {getIcon()}
            </label>
        </div>
    );
};
