import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

interface Idea {
  id: string;
  text: string;
  votes: number;
  category: string;
  author: string;
  timestamp: number;
}

// GET all ideas
export async function GET() {
  try {
    const ideas = await kv.get<Idea[]>('ideas') || [];
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json([]);
  }
}

// POST new idea
export async function POST(req: Request) {
  try {
    const newIdea: Idea = await req.json();
    const ideas = await kv.get<Idea[]>('ideas') || [];
    
    ideas.unshift(newIdea);
    await kv.set('ideas', ideas);
    
    return NextResponse.json(newIdea);
  } catch (error) {
    console.error('Error adding idea:', error);
    return NextResponse.json({ error: 'Failed to add idea' }, { status: 500 });
  }
}

// PATCH vote on idea
export async function PATCH(req: Request) {
  try {
    const { id } = await req.json();
    const ideas = await kv.get<Idea[]>('ideas') || [];
    
    const updatedIdeas = ideas.map(idea =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    );
    
    await kv.set('ideas', updatedIdeas);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json({ error: 'Failed to vote' }, { status: 500 });
  }
}
