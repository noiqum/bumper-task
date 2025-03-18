// app/api/register/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';


export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const offset = (page - 1) * limit;

    const { data: registeredCompanies, error, count } = await supabase
        .from('registrations')
        .select('*', { count: 'exact' }) // Get total count for pagination
        .range(offset, offset + limit - 1);

    if (error) {
        return NextResponse.json({ message: 'Failed to fetch registrations' }, { status: 500 });
    }

    return NextResponse.json({
        message: 'Successfully retrieved registrations',
        data: registeredCompanies,
        total: count,
        page,
        limit
    }, { status: 200 });
}


export async function POST(request: Request) {
    try {
        // Parse the JSON body
        const formData = await request.json();
        // Check if email already exists
        const { data: existingUser, error: searchError } = await supabase
            .from('registrations')
            .select('id')
            .eq('email_address', formData.email_address)
            .maybeSingle();

        if (searchError) {
            console.error('Error checking for existing email:', searchError);
            return NextResponse.json({
                message: 'Registration failed while checking existing records'
            }, { status: 500 });
        }

        // If email already exists, return an error
        if (existingUser) {
            return NextResponse.json({
                message: 'Email address already registered'
            }, { status: 409 });
        }

        // If email doesn't exist, proceed with insert
        const { data, error } = await supabase
            .from('registrations')
            .insert([formData])
            .select();

        if (error) {
            console.error('Supabase error:', error);
            return NextResponse.json({ message: 'Registration failed' }, { status: 400 });
        }

        return NextResponse.json({
            message: 'Registration successful',
            data
        }, { status: 201 });
    } catch (error) {
        console.error('Error processing registration:', error);
        return NextResponse.json({
            message: 'Registration failed'
        }, { status: 400 });
    }
}