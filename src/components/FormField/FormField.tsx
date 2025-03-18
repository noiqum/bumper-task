import React from 'react';




interface FormFieldProps {
    id: string;
    label: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    register: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    errors: any;
    baseClass: string;
    placeholder?: string;
    type: string;
    icon?: React.ReactNode;
    fieldIcon?: React.ReactNode;
    getBorderColorClass: () => string;
    handleBlur: (field: string) => void;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FormField: React.FC<FormFieldProps> = ({ id, label, register, errors, baseClass, getBorderColorClass, handleBlur, placeholder, icon, fieldIcon, onChange, type }) => {
    return (
        <div className="form-group">
            <label htmlFor={id} className="flex items-end text-base leading-5 font-extrabold text-gray-700 mb-2 gap-1">
                {icon && <span className="mr-2">{icon}</span>} {label}
            </label>
            <div className='relative'>
                <input
                    id={id}
                    type={type}
                    placeholder={placeholder}
                    {...register(id, {
                        onBlur: () => handleBlur(id)
                    })}
                    className={`${baseClass} ${getBorderColorClass()}`}
                    /* onBlur={() => handleBlur(id)} */
                    onChange={onChange}
                />
                {fieldIcon && <span className="absolute right-4 top-[calc(1rem+50%)] transform -translate-y-[calc(1rem+50%)]">{fieldIcon}</span>}
            </div>
            {errors[id] && <p className="text-primary-red text-sm mt-1">{errors[id].message}</p>}

        </div>
    );
};

export default FormField;