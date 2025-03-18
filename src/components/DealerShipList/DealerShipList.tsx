"use client";

import { useState, useEffect } from "react";
import { searchDealerships, Dealership } from "../../app/actions/dealerShip";
import { useDebounce } from "../../hooks/useDebounce";

interface SearchDealershipsProps {
    initialDealerships: Dealership[];
    totalRecords: number;
    pageSize?: number;
}

export default function SearchDealerships({ initialDealerships, totalRecords, pageSize = 10 }: SearchDealershipsProps) {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const debouncedSearchTerm = useDebounce(searchTerm, 300); // Apply debounce
    const [dealerships, setDealerships] = useState<Dealership[]>(initialDealerships);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalPages = Math.ceil(totalRecords / pageSize);

    const fetchDealerships = async (page: number, term: string) => {
        setLoading(true);
        try {
            if (term.length < 3 && term.length !== 0) {
                setDealerships([]); // Clear results if term is too short
                return;
            }

            const result = await searchDealerships(term, page, pageSize);
            if (result.success && result.data) {
                setDealerships(result.data);
            }
        } catch (error) {
            console.error("Error fetching dealerships:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDealerships(currentPage, debouncedSearchTerm);
    }, [currentPage, debouncedSearchTerm]);

    return (
        <>
            {/* Search Input */}
            <div className="px-4 py-4">
                <div className="max-w-md mx-auto w-full">
                    <input
                        type="text"
                        placeholder="Search by name, company, email or phone..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>

            {/* Dealership List */}
            {loading ? (
                <div className="text-white text-center py-8">Loading...</div>
            ) : dealerships.length === 0 ? (
                <div className="text-white text-center py-8">No dealerships found</div>
            ) : (
                <div>
                    {dealerships.map((item) => (
                        <div key={item.id} className="flex flex-col items-start bg-primary-gray-blue pt-6 pb-6 px-4">
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

            {/* Pagination Controls */}
            <div className="flex justify-center space-x-4 mt-4">
                <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Previous
                </button>
                <span className="text-white">Page {currentPage} of {totalPages}</span>
                <button
                    disabled={currentPage >= totalPages}
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50"
                >
                    Next
                </button>
            </div>
        </>
    );
}
