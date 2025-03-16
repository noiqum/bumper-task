import Image from "next/image";
import Logo from "../Logo/Logo";
import PhoneMockup from "../../../public/assets/webp/phone_mockup.webp";
import Step from "../Step/Step";
import Button from "../Button/Button";
import ArrowRight from "../../../public/assets/svg/arrow_right.svg";



const ValueSection = () => {
    const StepData = [
        {
            title: "Step 1",
            description: "Customers select PayLater at checkout and pay over time. No interest, no fees."
        },
        {
            title: "Step 2",
            description: "We pay you upfront, so you can ship the order right away."
        },
        {
            title: "Step 3",
            description: "We collect the payments from the customer, so you don’t have to worry about it."
        }
    ]

    return (
        <section className="flex flex-col px-4 gap-10 pt-10 pb-6">
            {/* title */}
            <div className="flex flex-col items-start">
                <Logo size="small" />
                <h2 className="font-oswald font-bold text-primary-black text-[50px] leading-[52px] uppercase">
                    paylater
                </h2>
            </div>
            {/* visual phone mockup image*/}
            <div>
                <Image src={PhoneMockup} alt="phone mockup" width={375} height={308} objectFit="contain" />
            </div>
            {/* description */}
            <div>
                <p className="font-open-sans text-lg leading-7 text-primary-black">Give customers more flexibility at checkout, online and in store. Let them spread the cost with interest-free monthly payments.</p>
            </div>
            <h2 className="font-open-sans text-primary-orange text-[28px] leading-10 font-extrabold">
                <p>No risk to your business. </p>
                <p>No worries for your customers.</p>
            </h2>
            {/* steps */}
            <div>
                {StepData.map((step, index) => {
                    return <Step key={index} step={index + 1} title={step.title} description={step.description} />
                })}

            </div>
            {/*  cta button */}
            <div><Button label="Register your interest" type="green-long-rounded" icon={<Image src={ArrowRight} width={19} height={16} alt="arrow-right" />} /></div>
        </section>
    );
}

export default ValueSection;