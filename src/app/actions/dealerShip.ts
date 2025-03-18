"use server";
import { supabase } from "@/utils/supabase";
export interface Dealership {
    id: string;
    name: string;
    company: string;
    email_address: string;
    mobile_phone: string;
    postcode: string;

}

export interface ApiResponse {
    success: boolean;
    data?: Dealership[];
    error?: string;
    total?: number;
}

export async function searchDealerships(term: string, page: number = 1, limit: number = 10): Promise<ApiResponse> {
    try {
        const offset = (page - 1) * limit;

        let query = supabase
            .from('registrations')
            .select('*', { count: 'exact' }) // Fetch total count for pagination
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1); // Paginate results

        // Apply search filter if search term is provided
        if (term && term.trim() !== '') {
            query = query.or(
                `name.ilike.%${term}%,company.ilike.%${term}%,email_address.ilike.%${term}%,mobile_phone.ilike.%${term}%`
            );
        }

        // Execute the query
        const { data, error, count } = await query;

        if (error) {
            throw new Error(`Supabase error: ${error.message}`);
        }

        return {
            success: true,
            data: data || [],
            total: count || 0,
        };
    } catch (error) {
        console.error('Search dealerships error:', error);
        return { success: false, error: 'Failed to fetch dealerships' };
    }
}
