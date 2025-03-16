import Image from "next/image";
import Logo from "../Logo/Logo";
import PhoneMockup from "../../../public/assets/webp/phone_mockup.webp";
import Step from "../Step/Step";
import Button from "../Button/Button";
import ArrowRight from "../../../public/assets/svg/arrow_right.svg";
import Link from "next/link";



const ValueSection = () => {
    const StepData = [
        {
            title: "FIX IT",
            description: "Your customers bring their vehicle to you. You repair and service the car. Everything just like it works right now."
        },
        {
            title: "SPLIT IT",
            description: "When the customer gets their bill or quote, your customer chooses the option to PayLater and in just a few clicks they've been approved and have paid."
        },
        {
            title: "SORTED",
            description: "You and your customer part ways happy. You're paid upfront, directly from Bumper, the customer repays Bumper over their chosen payment plan."
        }
    ]

    return (
        <section className="flex flex-col px-4 lg:px-20 gap-10 lg:gap-y-5 pt-10 pb-6 lg:grid lg:grid-cols-2 lg:grid-rows-[repeat(5,min-content)]">
            {/* title */}
            <div className="flex flex-col items-start lg:col-start-1 lg:col-end-2">
                <Logo size="small" />
                <h2 className="font-oswald font-bold text-primary-black text-[50px] leading-[52px] uppercase">
                    paylater
                </h2>
            </div>
            {/* visual phone mockup image*/}
            <div className="lg:col-start-2 lg:row-span-full lg:flex lg:justify-center lg:items-center">
                <Image className="lg:w-full" src={PhoneMockup} alt="phone mockup" width={375} height={308} objectFit="contain" />
            </div>
            {/* description */}
            <div className="lg:col-start-1">
                <p className="font-open-sans text-lg leading-7 text-primary-black">Give customers more flexibility at checkout, online and in store. Let them spread the cost with interest-free monthly payments.</p>
            </div>
            <h2 className="font-open-sans text-primary-orange text-[28px] leading-10 font-extrabold lg:col-start-1">
                <p>No risk to your business. </p>
                <p>No worries for your customers.</p>
            </h2>
            {/* steps */}
            <div className="lg:col-start-1">
                <p className="leading-6 font-extrabold mb-4">It’s as simple as:</p>
                {StepData.map((step, index) => {
                    return <Step key={index} step={index + 1} title={step.title} description={step.description} />
                })}

            </div>
            {/*  cta button */}
            <div className="lg:col-start-1">
                <Link href="/register" >
                    <Button label="Register your interest" type="green-long-rounded" icon={<Image src={ArrowRight} width={19} height={16} alt="arrow-right" />} />
                </Link>
            </div>
        </section>
    );
}

export default ValueSection;