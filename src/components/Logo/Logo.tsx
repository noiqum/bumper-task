"use client";
import Image from "next/image";
import LogoMark from "../../../public/assets/png/Logomark.png"
import { redirect } from "next/navigation";
type LogoSize = "small" | "medium" | "large";

interface LogoProps {
    size: LogoSize;
    path?: string
}

const Logo = ({ size, path }: LogoProps) => {
    const setClass = (size: LogoSize) => {
        switch (size) {
            case "small":
                return "w-19";
            case "medium":
                return "w-28 lg:w-32";
            case "large":
                return "w-32 h-32";
            default:
                return "w-24 h-24";
        }
    }

    return (
        <div onClick={() => path && redirect(path)} className={setClass(size) + `${path ? " cursor-pointer" : ""}`}>
            <Image className="w-full  inline-block" src={LogoMark} alt="logo" width={100} height={100} />
        </div>
    );
}


export default Logo;