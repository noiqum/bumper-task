import SearchDealerships from "@/components/DealerShipList/DealerShipList";

export default async function DriverPage() {
    const page = 1;  // Initial page
    const limit = 10; // Number of items per page

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register?page=${page}&limit=${limit}`, { cache: 'no-store' });
    const data = await res.json();

    return (
        <div className="flex flex-col items-center  min-h-screen bg-primary-gray-blue pt-24 pb-24 px-4 lg:pb-8">
            <div className="lg:max-w-3xl w-full">
                <h1 className="text-3xl leading-10 font-bold text-white my-4 lg:my-6">Interested Dealerships</h1>
                <SearchDealerships
                    initialDealerships={data.data}
                    totalRecords={data.total}
                    pageSize={limit}
                />
            </div>
        </div>
    );
}
