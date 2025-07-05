import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const client = await db.connect();
        const { rows } = await client.sql`SELECT * FROM linkinbio ORDER BY order;`;
        client.release();
        return NextResponse.json(rows);
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to fetch links.' }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const { title, url } = await req.json();

        if (!title || !url) {
            return NextResponse.json({ message: 'Title and URL are required' }, { status: 400 });
        }

        const client = await db.connect();
        const result = await client.sql`
            INSERT INTO linkinbio (title, url)
            VALUES (${title}, ${url})
            RETURNING *;
        `;
        client.release();

        return NextResponse.json(result.rows[0], { status: 201 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to create link.' }, { status: 500 });
    }
}
