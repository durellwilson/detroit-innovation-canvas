import { kv } from '@vercel/kv';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

export const runtime = 'edge';

interface Idea {
  id: string;
  text: string;
  votes: number;
  category: string;
  author: string;
  timestamp: number;
}

export async function GET() {
  try {
    const ideas = await kv.get<Idea[]>('ideas') || [];
    return NextResponse.json(ideas);
  } catch (error) {
    console.error('Error fetching ideas:', error);
    return NextResponse.json([]);
  }
}

export async function POST(req: Request) {
  try {
    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { success, remaining } = await rateLimit(ip, 10, 60);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded. Try again later.' },
        { 
          status: 429,
          headers: { 'X-RateLimit-Remaining': remaining.toString() }
        }
      );
    }
    
    const newIdea: Idea = await req.json();
    
    // Validation
    if (!newIdea.text || newIdea.text.length < 10) {
      return NextResponse.json(
        { error: 'Idea must be at least 10 characters' },
        { status: 400 }
      );
    }
    
    const ideas = await kv.get<Idea[]>('ideas') || [];
    ideas.unshift(newIdea);
    await kv.set('ideas', ideas);
    
    return NextResponse.json(newIdea, {
      headers: { 'X-RateLimit-Remaining': remaining.toString() }
    });
  } catch (error) {
    console.error('Error adding idea:', error);
    return NextResponse.json(
      { error: 'Failed to add idea' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const { success } = await rateLimit(ip, 20, 60);
    
    if (!success) {
      return NextResponse.json(
        { error: 'Rate limit exceeded' },
        { status: 429 }
      );
    }
    
    const { id } = await req.json();
    const ideas = await kv.get<Idea[]>('ideas') || [];
    
    const updatedIdeas = ideas.map(idea =>
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    );
    
    await kv.set('ideas', updatedIdeas);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error voting:', error);
    return NextResponse.json(
      { error: 'Failed to vote' },
      { status: 500 }
    );
  }
}
