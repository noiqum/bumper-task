// app/api/registrations/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('registrations')
        .select('*');

    if (error) {
        return NextResponse.json({ message: 'Error fetching data' }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const formData = await request.json();

        const { data, error } = await supabase
            .from('registrations')
            .insert([formData])
            .select();

        if (error) {
            return NextResponse.json({ message: 'Registration failed' }, { status: 400 });
        }

        return NextResponse.json({
            message: 'Registration successful',
            data
        }, { status: 201 });
    } catch (error) {
        console.error('Error processing registration:', error);
        return NextResponse.json({ message: 'Registration failed' }, { status: 400 });
    }
}