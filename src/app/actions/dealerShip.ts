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
}

export async function searchDealerships(term: string): Promise<Dealership[]> {
    try {
        let query = supabase
            .from('registrations')
            .select('*');

        // Apply search filter if search term provided
        if (term && term.trim() !== '') {
            query = query.or(
                `name.ilike.%${term}%,company.ilike.%${term}%,email_address.ilike.%${term}%,mobile_phone.ilike.%${term}%`
            );
        }

        // Execute the query
        const { data, error } = await query
            .order('created_at', { ascending: false })
            .limit(50);

        if (error) {
            throw new Error(`Supabase error: ${error.message}`);
        }

        return data || [];
    } catch (error) {
        console.error('Search dealerships error:', error);
        return []; // Return empty array on error
    }
}