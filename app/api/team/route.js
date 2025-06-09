import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await db.connect();
        const { rows } = await client.sql`SELECT * FROM team;`;
        client.release();
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch team members.' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { name, role, imageUrl, linkedinUrl } = await req.json();

        if (!name || !role) {
            return NextResponse.json({ message: 'Name and role are required' }, { status: 400 });
        }

        const client = await db.connect();
        const result = await client.sql`
            INSERT INTO team (name, role, "imageUrl", "linkedinUrl") 
            VALUES (${name}, ${role}, ${imageUrl}, ${linkedinUrl}) 
            RETURNING *;
        `;
        client.release();

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to create team member.' }, { status: 500 });
    }
} 