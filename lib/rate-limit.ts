import { kv } from '@vercel/kv';

export async function rateLimit(
  identifier: string,
  limit: number = 10,
  window: number = 60
): Promise<{ success: boolean; remaining: number }> {
  const key = `rate_limit:${identifier}`;
  
  try {
    const count = await kv.incr(key);
    
    if (count === 1) {
      await kv.expire(key, window);
    }
    
    const remaining = Math.max(0, limit - count);
    
    return {
      success: count <= limit,
      remaining,
    };
  } catch (error) {
    // Fail open on error
    return { success: true, remaining: limit };
  }
}
