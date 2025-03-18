import SearchDealerships from "@/components/DealerShipList/DealerShipList";

export default async function DriverPage() {

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/register`, { cache: 'no-store' })
    const data = await res.json()

    return (
        <div className="flex flex-col min-h-screen bg-primary-gray-blue">
            <h1 className="text-3xl leading-10 font-bold text-white mt-4">Interested Dealerships</h1>
            <SearchDealerships initialDealerships={data.data} />
        </div>
    );
}