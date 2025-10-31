import { kv } from '@vercel/kv';

export const runtime = 'edge';

export async function GET() {
  const checks = {
    kv: await checkKV(),
    timestamp: new Date().toISOString(),
  };
  
  const healthy = checks.kv.status === 'ok';
  
  return Response.json({
    status: healthy ? 'healthy' : 'degraded',
    checks,
  }, {
    status: healthy ? 200 : 503,
  });
}

async function checkKV() {
  try {
    await kv.set('health_check', Date.now(), { ex: 10 });
    await kv.get('health_check');
    return { status: 'ok' };
  } catch (error) {
    return { status: 'error', message: String(error) };
  }
}
