import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient'; // Adjusted import path

export async function POST(request) {
  try {
    const { name, email, message } = await request.json();

    // Basic validation
    if (!name || !email || !message) {
      return NextResponse.json({ message: 'All fields (name, email, message) are required.' }, { status: 400 });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    // Insert the message into the Supabase table
    const { data, error } = await supabase
      .from('contact_messages')
      .insert([{ name, email, message }])
      .select() // To get the inserted row back
      .single(); // Assuming you want a single object back

    if (error) {
      console.error('Supabase contact form submission error:', error);
      throw error; // Re-throw to be caught by the generic catch block
    }

    return NextResponse.json({ message: 'Message sent successfully!', submission: data }, { status: 201 });
  } catch (error) {
    console.error('Generic contact form submission error:', error);
    return NextResponse.json({ message: 'Internal Server Error. Could not send message.' }, { status: 500 });
  }
} 