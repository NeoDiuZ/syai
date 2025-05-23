import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjusted import path

export async function POST(request) {
  try {
    const { email } = await request.json();

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    // Insert the email into the Supabase table
    // Supabase client handles checking for unique constraints if set up in your table policies/constraints
    const { data, error } = await supabase
      .from('newsletter_subscriptions')
      .insert([{ email: email }])
      .select() // To get the inserted row back
      .single(); // Assuming you want a single object back

    if (error) {
      console.error('Supabase newsletter subscription error:', error);
      // Check for Supabase specific unique constraint violation error
      // Supabase error codes for unique constraints might be like '23505' (PostgreSQL code)
      // or it might return a more specific message in error.message or error.details
      if (error.code === '23505' || (error.message && error.message.includes('duplicate key value violates unique constraint'))) {
        return NextResponse.json({ message: 'Email already subscribed.' }, { status: 409 });
      }
      throw error; // Re-throw other errors to be caught by the generic catch block
    }

    return NextResponse.json({ message: 'Successfully subscribed!', subscriber: data }, { status: 201 });
  } catch (error) {
    // Log the full error if it wasn't a known Supabase error handled above
    if (error.code !== '23505' && !(error.message && error.message.includes('duplicate key value violates unique constraint'))){
        console.error('Generic newsletter subscription error:', error);
    }
    return NextResponse.json({ message: 'Internal Server Error. Could not subscribe.' }, { status: 500 });
  }
} 