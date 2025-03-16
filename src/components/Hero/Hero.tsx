"use client";
import GarageImage from "../../../public/assets/webp/garage.webp";
import Button from "../Button/Button";
import Rating from "../Rating/Rating";
import ArrowRightIcon from "../../../public/assets/svg/arrow_right.svg"
import Image from "next/image";


const Hero = () => {
    return (
        <div className="relative w-full h-screen">
            {/* background Image */}
            <div style={{ backgroundImage: `url(${GarageImage.src})` }} className="absolute inset-0 z-0  bg-cover lg:bg-center bg-[40%]"></div>
            <div className="absolute z-10 inset-0 bg-[#414B6EB2] px-6 lg:px-20">
                {/*  content */}
                <div className="flex flex-col h-full text-white z-10 mt-32 gap-8">
                    <Rating source="Trustpilot" label="Excellent" />
                    <div>
                        <h1 className="font-bold font-oswald text-white uppercase">
                            <p className="lg:hidden text-[38px] leading-[38px]">BECOME A BUMPER APPROVED DEPENDABLE DEALERSHIP</p>
                            <p className="hidden lg:block text-[77px] leading-[80px]">BECOME A BUMPER APPROVED</p>
                            <p className="hidden lg:block text-[77px] leading-[80px]">DEPENDABLE DEALERSHIP</p>
                        </h1>
                        <h2 className="text-base leading-6 lg:text-[21px] lg:leading-8 text-white font-open-sans mt-1 lg:mt-4 lg:max-w-2xl">
                            Join our network of 3,000+ garages and dealerships who already offer Bumper to their customers.
                        </h2>
                    </div>
                    <div className="flex flex-col gap-3 items-start">
                        <Button label="Register Your Interest" type="green-long-rounded" icon={
                            <Image src={ArrowRightIcon} alt="arrow-left" width={16} height={16} />
                        } />
                        <p className="font-open-sans">Already registered? <span className="text-[#289B50]  cursor-pointer">Login</span></p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Hero;