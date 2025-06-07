import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'data/linkinbio.json');
const KV_KEY = 'linkinbio';

// GET handler to read link-in-bio data
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
    // This will catch file read errors during initial seeding
    if (error.code === 'ENOENT') {
      return NextResponse.json([]); // Return empty if file doesn't exist
    }
    console.error('Error handling link-in-bio data:', error);
    return NextResponse.json({ message: 'Error reading data' }, { status: 500 });
  }
}

// POST handler to update link-in-bio data
export async function POST(request) {
  try {
    const updatedLinks = await request.json();
    await kv.set(KV_KEY, updatedLinks);
    return NextResponse.json({ success: true, message: 'Links updated successfully' });
  } catch (error) {
    console.error('Error writing link-in-bio data:', error);
    return NextResponse.json({ message: 'Error writing data' }, { status: 500 });
  }
} 