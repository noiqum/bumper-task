"use client";
import { useState } from 'react';
import { searchDealerships, Dealership } from '../../app/actions/dealerShip';


interface SearchDealershipsProps {
    initialDealerships: Dealership[];
}

export default function SearchDealerships({ initialDealerships }: SearchDealershipsProps) {
    console.log('initialDealerships', initialDealerships)
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [dealerships, setDealerships] = useState<Dealership[]>(initialDealerships);
    const [loading, setLoading] = useState<boolean>(false);

    const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim() === '') {
            // Reset to initial data if search is cleared
            setDealerships(initialDealerships);
            return;
        }

        setLoading(true);
        try {
            const result = await searchDealerships(value);
            setDealerships(result);
        } catch (error) {
            console.error('Error searching dealerships:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="px-4 py-4">
                <div className="max-w-md mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Search by name, company, email or phone..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {loading ? (
                <div className="text-white text-center py-8">Loading...</div>
            ) : dealerships.length === 0 ? (
                <div className="text-white text-center py-8">No dealerships found</div>
            ) : (
                <div>
                    {dealerships.map((item) => (
                        <div key={item.id} className="flex flex-col items-start bg-primary-gray-blue pt-6 pb-6 px-4" data-testid="register-page">
                            <div className="mt-2 mb-2 mx-4 flex flex-col items-start lg:max-w-3xl lg:mx-auto">
                                <h1 className="text-2xl leading-8 font-bold text-white">{item.name}</h1>
                                <p className="text-white">Company: {item.company}</p>
                                <p className="text-white">Email: {item.email_address}</p>
                                <p className="text-white">Phone: {item.mobile_phone}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}