"use client";
import React, { useState } from "react";
import NavigationLink from "../NavigationLink/NavigationLink";
import Logo from "../Logo/Logo";
import Button from "../Button/Button";
import Image from "next/image";
import ExitIcon from "../../../public/assets/svg/exit.svg";
import { useRouter } from "next/navigation";

type NavigationStatus = "business" | "driver";

const Navigation = () => {
    const [status, setStatus] = useState<NavigationStatus>("business");
    const router = useRouter()

    const setContent = (status: NavigationStatus) => {
        switch (status) {
            case "business":
                return "for business";
            case "driver":
                return "for drivers";
        }
    }

    return (
        <nav className="fixed z-50 top-0 left-0 w-full max-w-[1556px] min-[1556px]:mx-auto min-[1556px]:left-1/2 min-[1556px]:transform min-[1556px]:-translate-x-1/2 flex flex-col justify-center  bg-primary-orange rounded-b-2xl">
            <div className="flex justify-between w-full h-11  px-6 lg:px-20 bg-primary-black rounded-b-2xl border-b border-primary-orange border-solid">
                <div className="flex justify-center items-end">
                    <NavigationLink to="/register" label="For business" active={status === "business"} onClick={() => setStatus("business")} />
                    <span className="bg-primary-gray mx-4 w-0.5 min-h-full"></span>
                    <NavigationLink to="/driver" label="For drivers" active={status === "driver"} onClick={() => setStatus("driver")} />
                </div>
                <div className="hidden lg:flex items-center justify-center">
                    <Button label="Partner Login" type="dark-base" icon={<Image src={ExitIcon} width={14} height={14} alt="exit" />} />
                </div>
            </div>
            <div className="flex justify-between items-center w-full h-13 px-6 lg:px-20">
                <div className="flex items-center">
                    <Logo size="medium" path="/" />
                    <span className="ml-1 text-sm leading-5 font-extrabold">{setContent(status)}</span>
                </div>
                <div>
                    <Button testId="register-button-nav" onClick={() => router.push("/register")} label="Register" type="green-base" />
                </div>
            </div>
        </nav>
    )
}

export default Navigation;