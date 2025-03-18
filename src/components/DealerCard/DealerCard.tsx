import React from 'react';
import { Dealership } from '../../app/actions/dealerShip';

interface DealerCardProps {
    dealer: Dealership;
    onSelect?: (dealer: Dealership) => void;
}



const DealerCard: React.FC<DealerCardProps> = ({ dealer, onSelect }) => {

    const baseRowClass = "flex justify-between border-b border-solid border-[#CDD2DC] py-1.5 md:py-2"


    return (
        <div className="w-full bg-white rounded-4xl shadow-sm mb-4 overflow-hidden">
            <div className="p-6 lg:p-8">
                <h3 className="text-lg font-bold mb-4 capitalize">{dealer.name}</h3>

                <div className="space-y-3">
                    <div className={`${baseRowClass} border-y`}>
                        <span className="text-primary-black font-semibold">Company</span>
                        <span>{dealer.company}</span>
                    </div>

                    <div className={baseRowClass}>
                        <span className="text-primary-black font-semibold">Mobile phone number</span>
                        <span>{dealer.mobile_phone}</span>
                    </div>

                    <div className={baseRowClass}>
                        <span className="text-primary-black font-semibold">Email address</span>
                        <span>{dealer.email_address}</span>
                    </div>

                    <div className={baseRowClass}>
                        <span className="text-primary-black font-semibold">Postcode</span>
                        <span>{dealer.postcode}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DealerCard;