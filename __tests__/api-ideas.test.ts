import { GET, POST, PATCH } from '@/app/api/ideas/route';

describe('Ideas API', () => {
  describe('GET /api/ideas', () => {
    it('should return array of ideas', async () => {
      const request = new Request('http://localhost/api/ideas');
      const response = await GET();
      const data = await response.json();
      
      expect(Array.isArray(data)).toBe(true);
    });
  });
  
  describe('POST /api/ideas', () => {
    it('should create new idea', async () => {
      const idea = {
        id: Date.now().toString(),
        text: 'Test idea',
        votes: 0,
        category: 'Tech',
        author: 'Test',
        timestamp: Date.now(),
      };
      
      const request = new Request('http://localhost/api/ideas', {
        method: 'POST',
        body: JSON.stringify(idea),
      });
      
      const response = await POST(request);
      const data = await response.json();
      
      expect(data).toHaveProperty('id');
    });
  });
  
  describe('PATCH /api/ideas', () => {
    it('should increment vote count', async () => {
      const request = new Request('http://localhost/api/ideas', {
        method: 'PATCH',
        body: JSON.stringify({ id: '123' }),
      });
      
      const response = await PATCH(request);
      const data = await response.json();
      
      expect(data).toHaveProperty('success');
    });
  });
});
