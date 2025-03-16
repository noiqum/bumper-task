
interface StepProps {
    step: number;
    title: string;
    description: string;
}

const Step = ({ step, title, description }: StepProps) => {
    return (
        <div className="flex  items-start gap-2 pb-6">
            <div className="flex items-center justify-center w-6 h-6  shrink-0 rounded-full bg-primary-orange text-primary-black border border-solid border-primary-black text-sm leading-5 font-extrabold">{step}</div>
            <div className="leading-6"> <h3 className=" text-primary-black font-bold">{title}</h3>
                <p className="font-open-sans text-lg leading-7 text-primary-black">{description}</p></div>
        </div>
    );
}

export default Step;