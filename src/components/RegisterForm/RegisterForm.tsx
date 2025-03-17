"use client";
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import Button from '../Button/Button';
/* import ArrowRight from '../../../public/assets/svg/arrow_right.svg' */
import Image from 'next/image';
import { useState } from 'react';
import FormField from '../FormField/FormField';
import Persona from "../../../public/assets/svg/persona.svg";
import Building from "../../../public/assets/svg/building.svg";
import Phone from "../../../public/assets/svg/phone.svg";
import Email from "../../../public/assets/svg/mail.svg";
import Tool from "../../../public/assets/svg/tool.svg";
import Home from "../../../public/assets/svg/home.svg";
import Warning from "../../../public/assets/svg/warning.svg";
import Check from "../../../public/assets/svg/check.svg";

import { ArrowRight } from "lucide-react"

import { CheckBox } from '../CheckBox/CheckBox';
import { registerCompany } from '@/app/actions/register_actions';


interface RegisterFormData {
    name: string;
    company: string;
    mobile_phone: string;
    email_address: string;
    postcode: string;
    pay_later?: boolean;
    pay_now?: boolean;
}

const validationSchema = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z0-9\s]*$/, 'Name should only contain alphanumeric characters')
        .max(255, 'Name should not exceed 255 characters')
        .required('Name is required'),

    company: yup
        .string()
        .max(255, 'Company name should not exceed 255 characters')
        .required('Company is required'),

    mobile_phone: yup
        .string()
        .matches(/^0(\s*)(7)(\s*)(\d(\s*)){9}$/, 'Mobile phone must start with 07 followed by 9 digits')
        .required('Mobile phone is required'),

    email_address: yup
        .string()
        .email('Must be a valid email')
        .min(5, 'Email should be at least 5 characters')
        .max(255, 'Email should not exceed 255 characters')
        .required('Email address is required'),

    postcode: yup
        .string()
        .matches(/^[a-zA-Z0-9\s]*$/, 'Postcode should only contain alphanumeric characters')
        .max(30, 'Postcode should not exceed 30 characters')
        .required('Postcode is required'),

    pay_later: yup.boolean(),
    pay_now: yup.boolean()
}).test(
    'at-least-one-payment-option',
    'At least one payment option must be selected',
    function (values) {
        if ((!values.pay_later && !values.pay_now)) {
            return this.createError({
                path: 'pay_later',
                message: 'At least one payment option must be selected'
            });
        }
        return true;
    }
);

const RegisterForm = () => {
    const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({
        name: false,
        company: false,
        mobile_phone: false,
        email_address: false,
        postcode: false,
        pay_later: false,
        pay_now: false,
        payment_options: false
    });

    const { register, handleSubmit, formState: { errors }, trigger, setValue, getValues } = useForm<RegisterFormData>({
        resolver: yupResolver(validationSchema),
        mode: 'onBlur', // Validate on blur
        defaultValues: {
            name: '',
            company: '',
            mobile_phone: '',
            email_address: '',
            postcode: '',
            pay_later: false,
            pay_now: false,
        }
    });

    const handleBlur = (fieldName: keyof typeof touchedFields) => {

        setTouchedFields(prev => ({
            ...prev,
            [fieldName]: true
        }));
        trigger(fieldName as any);
    };

    const onSubmit = async (formData: RegisterFormData) => {

        try {
            const data = new FormData();
            data.append('name', formData.name);
            data.append('company', formData.company);
            data.append('mobile_phone', formData.mobile_phone);
            data.append('email_address', formData.email_address);
            data.append('postcode', formData.postcode);
            data.append('pay_later', formData.pay_later ? '1' : '0');
            data.append('pay_now', formData.pay_now ? '1' : '0');
            const response = await registerCompany(data);
            console.log(response);
        } catch (error) {
            console.log(error);
        }

    };

    const baseClass = "p-4 border border-solid rounded-full w-full outline-none focus:outline-none";

    const getBorderColorClass = (fieldName: keyof RegisterFormData) => {
        const touched = touchedFields[fieldName];
        const hasError = errors[fieldName];
        if (touched) {
            return hasError ? 'border-primary-red' : 'border-primary-green';
        } else if (hasError) {
            return 'border-primary-red';
        }
        return 'border-primary-gray';
    };

    const getFieldIcon = (fieldName: keyof RegisterFormData) => {
        const touched = touchedFields[fieldName];
        const hasError = errors[fieldName];
        if (touched) {
            return hasError ? <Image src={Warning} alt="Warning" width={20} height={20} /> : <Image src={Check} alt="Check" width={20} height={20} />;
        } else if (hasError) {
            return <Image src={Warning} alt="Warning" width={20} height={20} />;
        }
        return;
    };


    return (
        <div data-testid="register-form" className="w-full px-4 py-6 bg-white rounded-[30px] border border-solid border-primary-black *:mb-5">
            <h2 className="font-bold mb-1">Join our network</h2>
            <h3>Free to join, no monthly fees</h3>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

                <FormField
                    type="text"
                    id="name"
                    label="Name"
                    register={register}
                    errors={errors}
                    baseClass={baseClass}
                    getBorderColorClass={() => getBorderColorClass('name')}
                    handleBlur={() => handleBlur('name')}
                    icon={<Image src={Persona} alt="Persona" width={20} height={20} />}
                    fieldIcon={getFieldIcon('name')}
                />

                <FormField
                    type="text"
                    id="company"
                    label="Company"
                    register={register}
                    errors={errors}
                    baseClass={baseClass}
                    getBorderColorClass={() => getBorderColorClass('company')}
                    handleBlur={() => handleBlur('company')}
                    icon={<Image src={Building} alt="Building" width={20} height={20} />}
                    fieldIcon={getFieldIcon('company')}
                />

                <FormField
                    type="tel"
                    id="mobile_phone"
                    label="Mobile Phone"
                    placeholder="07xxxxxxxxx"
                    register={register}
                    errors={errors}
                    baseClass={baseClass}
                    getBorderColorClass={() => getBorderColorClass('mobile_phone')}
                    handleBlur={() => handleBlur('mobile_phone')}
                    icon={<Image src={Phone} alt="Phone" width={20} height={20} />}
                    fieldIcon={getFieldIcon('mobile_phone')}
                />

                <FormField
                    id="email_address"
                    label="Email Address"
                    type="email"
                    register={register}
                    errors={errors}
                    baseClass={baseClass}
                    getBorderColorClass={() => getBorderColorClass('email_address')}
                    handleBlur={() => handleBlur('email_address')}
                    icon={<Image src={Email} alt="Email" width={20} height={20} />}
                    fieldIcon={getFieldIcon('email_address')}
                />

                <FormField
                    type="text"
                    id="postcode"
                    label="Postcode"
                    register={register}
                    errors={errors}
                    baseClass={baseClass}
                    getBorderColorClass={() => getBorderColorClass('postcode')}
                    handleBlur={() => handleBlur('postcode')}
                    icon={<Image src={Home} alt="Postcode" width={20} height={20} />}
                    fieldIcon={getFieldIcon('postcode')}
                />

                <div className="form-group">
                    <p className="flex items-center font-extrabold text-primary-black mb-1">
                        <span className="mr-2">
                            <Image src={Tool} alt="Services" width={20} height={20} />
                        </span>
                        What services are you interested in?
                    </p>
                    <p className='text-sm text-[#737373] mb-1'>Please select the services you’re interested in offering your customers</p>
                    <div className="flex items-center space-x-2 mb-2">

                        <CheckBox id="pay_later" register={register} label="Pay Later" onChange={() => {
                            setValue('pay_later', getValues('pay_later') === true ? false : true);
                            trigger(['pay_later', 'pay_now']);
                        }}
                            errors={errors}
                            errorID='pay_later'
                        />

                        <CheckBox id="pay_now" register={register} label="Pay Now" onChange={() => {
                            setValue('pay_now', getValues('pay_now') === true ? false : true);
                            trigger(['pay_later', 'pay_now']);
                        }}
                            errors={errors}
                            errorID='pay_later'
                        />

                    </div>



                    {/* Display custom payment options error */}
                    {(errors.pay_later || errors.pay_now) && (
                        <p className="text-red-500 text-sm mt-1">
                            At least one payment option must be selected
                        </p>
                    )}
                </div>

                <Button
                    className='w-full justify-center'
                    type="green-long-rounded"
                    label='Register'
                    icon={<ArrowRight size={20} />}
                />

                <p className='text-center'>Already registered? <span className="text-[#289B50] cursor-pointer">Login</span></p>
            </form>
        </div>

    );
};

export default RegisterForm;