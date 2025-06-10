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
        const { name, role, imageUrl, linkedinUrl, group } = await req.json();

        if (!name || !role || !group) {
            return NextResponse.json({ message: 'Name, role, and group are required' }, { status: 400 });
        }

        const client = await db.connect();
        
        const maxOrderRes = await client.sql`SELECT MAX(display_order) as max_order FROM team WHERE "group" = ${group};`;
        const newOrder = (maxOrderRes.rows[0].max_order || 0) + 1;

        const result = await client.sql`
            INSERT INTO team (name, role, "imageUrl", "linkedinUrl", "group", "display_order") 
            VALUES (${name}, ${role}, ${imageUrl}, ${linkedinUrl}, ${group}, ${newOrder}) 
            RETURNING *;
        `;
        client.release();

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to create team member.' }, { status: 500 });
    }
} 