// src/app/actions/register_actions.ts
"use server";

import { supabase } from '@/utils/supabase';

export async function registerCompany(formData: FormData) {
    try {
        // Convert FormData to a plain object
        const formDataObj = {
            name: formData.get('name') as string,
            company: formData.get('company') as string,
            mobile_phone: formData.get('mobile_phone') as string,
            email_address: formData.get('email_address') as string,
            postcode: formData.get('postcode') as string,
            pay_later: formData.get('pay_later') === '1',
            pay_now: formData.get('pay_now') === '1',
        };

        // Insert data into Supabase
        const { data, error } = await supabase
            .from('registrations')
            .insert([formDataObj])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            throw new Error('Registration failed');
        }

        console.log('Registration successful:', data);
        return { success: true, data };
    } catch (error) {
        console.error('Error saving registration:', error);
        throw new Error('Registration failed');
    }
}