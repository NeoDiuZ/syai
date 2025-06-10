import { db } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export async function PUT(req, { params }) {
    try {
        const { id } = params;
        const { name, role, imageUrl, linkedinUrl, group } = await req.json();

        if (!id || !name || !role || !group) {
            return NextResponse.json({ message: 'ID, name, role, and group are required' }, { status: 400 });
        }

        const client = await db.connect();
        const result = await client.sql`
            UPDATE team 
            SET name = ${name}, role = ${role}, "imageUrl" = ${imageUrl}, "linkedinUrl" = ${linkedinUrl}, "group" = ${group}
            WHERE id = ${id}
            RETURNING *;
        `;
        client.release();

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json(result.rows[0], { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to update team member.' }, { status: 500 });
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
            DELETE FROM team 
            WHERE id = ${id}
            RETURNING *;
        `;
        client.release();

        if (result.rowCount === 0) {
            return NextResponse.json({ message: 'Team member not found' }, { status: 404 });
        }

        return NextResponse.json({ message: 'Team member deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Database Error:', error);
        return NextResponse.json({ message: 'Failed to delete team member.' }, { status: 500 });
    }
} 