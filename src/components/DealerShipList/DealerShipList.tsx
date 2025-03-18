"use client";

import { useState, useEffect } from "react";
import { searchDealerships, Dealership } from "../../app/actions/dealerShip";
import { useDebounce } from "../../hooks/useDebounce";
import Company from "../../../public/assets/svg/building.svg"
import FormField from "../FormField/FormField";
import Image from "next/image";
import DealerCard from "../DealerCard/DealerCard";
import Button from "../Button/Button";


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
            <div className="bg-white rounded-[40px] p-4 lg:p-8 boder border-solid border-primary-black mb-5  ">
                <FormField
                    id="search"
                    label="Search Company"
                    placeholder="Search by name, company, email or phone..."
                    register={() => ({})} // Placeholder for register function
                    errors={{}}
                    baseClass="p-4 border border-solid rounded-full w-full outline-none focus:outline-none focus:ring-2 focus:ring-primary-orange boder-primary-black"
                    getBorderColorClass={() => ""}
                    handleBlur={() => { }}
                    type="text"
                    icon={<Image src={Company} alt="company" width={16} height={20} />}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            {/* Dealership List */}
            {loading ? (
                <div className="text-white text-center py-8">Loading...</div>
            ) : dealerships.length === 0 ? (
                <div className="text-white text-center py-8">No dealerships found</div>
            ) : (
                <div className="space-y-4">
                    {dealerships.map((dealer) => (
                        <DealerCard
                            key={dealer.id}
                            dealer={dealer}
                        />
                    ))}
                </div>
            )}

            {/* Pagination Controls */}
            <div className="flex justify-center items-center space-x-4 mt-4">
                <Button
                    type="dark-base"
                    label="Previous"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))} />

                <span className="text-white">Page {currentPage} of {totalPages}</span>

                <Button
                    type="dark-base"
                    label="Next"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))} />
            </div>
        </>
    );
}
