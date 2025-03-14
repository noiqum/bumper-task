import Link from "next/link";

interface NavigationLinkProps {
    to: string;
    label: string;
    active: boolean;
}

const NavigationLink = ({ to, label, active }: NavigationLinkProps) => {
    return (
        <Link className="max-w-fit flex flex-col" href={to}>
            <span className=" font-medium text-white">{label}</span>
            {active && <span data-testid="bottom-element" className="block w-full h-1 rounded-sm bg-primary-orange mt-1" />}
        </Link>
    );
};

export default NavigationLink;