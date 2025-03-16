import Stars from "../../../public/assets/svg/stars.svg"

import Image from "next/image";
import { Star } from "../Star/Star";

interface RatingProps {
    source: "Trustpilot";
    label: string;
}

const Rating = ({ source, label }: RatingProps) => {

    return (
        <div className="flex items-center gap-3">
            <span className=" text-base  leading-6">{label}</span>
            <Image src={Stars} alt="rating" width={85} height={16} />
            <span className="flex items-center gap-1">
                <Star />
                <span className="text-white text-xs">{source}</span>
            </span>
        </div>
    );
}

export default Rating;