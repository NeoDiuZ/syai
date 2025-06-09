import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { title, url } = await req.json();

        if (!id || !title || !url) {
            return NextResponse.json({ message: 'ID, title, and URL are required' }, { status: 400 });
        }

        const client = await db.connect();
        const result = await client.sql`
            UPDATE linkinbio 
            SET title = ${title}, url = ${url}
            WHERE id = ${id}
            RETURNING *;
        `;
        client.release();

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'Link not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to update link.' }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        if (!id) {
            return NextResponse.json({ message: 'ID is required' }, { status: 400 });
        }

        const client = await db.connect();
        const result = await client.sql`
            DELETE FROM linkinbio 
            WHERE id = ${id}
            RETURNING *;
        `;
        client.release();

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'Link not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Link deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to delete link.' }, { status: 500 });
    }
} 