import Link from "next/link";



interface NavigationLinkProps {
    to: string;
    label: string;
    active: boolean;
    onClick?: () => void;
}

const NavigationLink = ({ to, label, active, onClick }: NavigationLinkProps) => {
    return (
        <Link onClick={onClick} className="max-w-fit flex flex-col" href={to}>
            <span className=" font-medium text-white text-sm leading-5">{label}</span>
            <span data-testid="bottom-element" className={`block w-full h-1 rounded-sm mt-2 ${active ? "bg-primary-orange" : "bg-transparent"}`} />
        </Link>
    );
};

export default NavigationLink;