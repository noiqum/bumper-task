"use client";

import Image from "next/image";
import ArrowLeft from "../../../public/assets/svg/arrow_left.svg";
import { useRouter } from "next/navigation";
import RegisterForm from "@/components/RegisterForm/RegisterForm";

const RegisterPage = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    };

    return (
        <div className="flex-flex-col justify-center items-start bg-primary-gray-blue pt-24 pb-24 px-4 lg:pb-8" data-testid="register-page">
            {/* heading */}
            <div className="mt-10 mb-6 mx-4 flex flex-col items-start lg:max-w-3xl lg:mx-auto">
                <span className="cursor-pointer" onClick={goBack}>
                    <Image src={ArrowLeft} alt="arrow-left" width={20} height={20} />
                </span>

                <h1 className="text-3xl leading-10 font-bold text-white mt-4">Join our network</h1>

                <p className="text-base leading-6 font-open-sans text-white mt-4">Offer <strong>PayLater</strong> to split servicing and repair work into monthly instalments - interest-free. Use <strong>PayNow</strong> to take secure payments online.</p>
            </div>
            {/* register form */}
            <div className="flex mx-auto lg:max-w-3xl">
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;