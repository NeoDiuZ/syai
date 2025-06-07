import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/team.json');
const KV_KEY = 'team';

// GET handler to read team data
export async function GET() {
  try {
    let data = await kv.get(KV_KEY);
    if (!data) {
      // If KV store is empty, seed it from the JSON file
      const fileContents = await fs.readFile(dataFilePath, 'utf8');
      data = JSON.parse(fileContents);
      await kv.set(KV_KEY, data);
    }
    return NextResponse.json(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      // Return empty array if file doesn't exist
      return NextResponse.json([]);
    }
    console.error('Error handling team data:', error);
    return NextResponse.json(
      { message: 'Error reading data' },
      { status: 500 }
    );
  }
}

// POST handler to update team data
export async function POST(request) {
  try {
    const updatedTeam = await request.json();
    await kv.set(KV_KEY, updatedTeam);
    return NextResponse.json({ success: true, message: 'Team updated successfully' });
  } catch (error) {
    console.error('Error writing team data:', error);
    return NextResponse.json(
      { message: 'Error writing data' },
      { status: 500 }
    );
  }
} 