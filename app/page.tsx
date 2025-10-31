'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Idea {
  id: string;
  text: string;
  votes: number;
  category: string;
  author: string;
  timestamp: number;
}

const categories = [
  { name: 'Tech', emoji: '💻', color: 'from-blue-500 to-cyan-500' },
  { name: 'Community', emoji: '🤝', color: 'from-purple-500 to-pink-500' },
  { name: 'Health', emoji: '🏥', color: 'from-green-500 to-emerald-500' },
  { name: 'Education', emoji: '📚', color: 'from-orange-500 to-red-500' },
  { name: 'Environment', emoji: '🌱', color: 'from-teal-500 to-green-500' },
  { name: 'Arts', emoji: '🎨', color: 'from-pink-500 to-rose-500' },
];

export default function Canvas() {
  const [ideas, setIdeas] = useState<Idea[]>([
    { id: '1', text: 'Create a Detroit tech mentorship network', votes: 12, category: 'Tech', author: 'Anonymous', timestamp: Date.now() - 3600000 },
    { id: '2', text: 'Build community gardens in every neighborhood', votes: 8, category: 'Environment', author: 'Anonymous', timestamp: Date.now() - 7200000 },
    { id: '3', text: 'Free coding bootcamp for Detroit youth', votes: 15, category: 'Education', author: 'Anonymous', timestamp: Date.now() - 1800000 },
  ]);
  const [newIdea, setNewIdea] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tech');
  const [filter, setFilter] = useState('all');
  const [enhancing, setEnhancing] = useState(false);
  const [enhanced, setEnhanced] = useState<any>(null);

  const addIdea = () => {
    if (!newIdea.trim()) return;
    
    const idea: Idea = {
      id: Date.now().toString(),
      text: newIdea,
      votes: 0,
      category: selectedCategory,
      author: 'You',
      timestamp: Date.now(),
    };
    
    setIdeas([idea, ...ideas]);
    setNewIdea('');
  };

  const vote = (id: string) => {
    setIdeas(ideas.map(idea => 
      idea.id === id ? { ...idea, votes: idea.votes + 1 } : idea
    ));
  };

  const enhance = async (idea: Idea) => {
    setEnhancing(true);
    try {
      const response = await fetch('/api/enhance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idea: idea.text }),
      });
      const data = await response.json();
      setEnhanced(data);
    } catch (error) {
      console.error(error);
    } finally {
      setEnhancing(false);
    }
  };

  const filteredIdeas = filter === 'all' 
    ? ideas 
    : ideas.filter(i => i.category === filter);

  const sortedIdeas = [...filteredIdeas].sort((a, b) => b.votes - a.votes);

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            Detroit Innovation Canvas
          </h1>
          <p className="text-2xl text-gray-300">Build the future together, in real-time</p>
          <div className="flex justify-center gap-4 mt-6">
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-yellow-400 font-bold">{ideas.length}</span> Ideas
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-pink-400 font-bold">{ideas.reduce((sum, i) => sum + i.votes, 0)}</span> Votes
            </div>
            <div className="glass px-6 py-3 rounded-full">
              <span className="text-purple-400 font-bold">Live</span> Now
            </div>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">💡 Share Your Idea</h2>
              <textarea
                value={newIdea}
                onChange={(e) => setNewIdea(e.target.value)}
                placeholder="What innovation would make Detroit better?"
                className="w-full bg-white/10 border border-white/20 rounded-xl p-4 text-white placeholder-gray-400 mb-4 h-32 resize-none focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
              <div className="flex gap-3 mb-4 flex-wrap">
                {categories.map((cat) => (
                  <button
                    key={cat.name}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`px-4 py-2 rounded-lg font-semibold transition ${
                      selectedCategory === cat.name
                        ? `bg-gradient-to-r ${cat.color} text-white`
                        : 'bg-white/10 text-gray-300 hover:bg-white/20'
                    }`}
                  >
                    {cat.emoji} {cat.name}
                  </button>
                ))}
              </div>
              <button
                onClick={addIdea}
                disabled={!newIdea.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 rounded-xl font-bold text-lg hover:opacity-90 disabled:opacity-50 transition"
              >
                ✨ Add to Canvas
              </button>
            </motion.div>

            <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                  filter === 'all' ? 'bg-white text-purple-900' : 'glass text-white hover:bg-white/20'
                }`}
              >
                All Ideas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setFilter(cat.name)}
                  className={`px-4 py-2 rounded-lg font-semibold whitespace-nowrap transition ${
                    filter === cat.name ? 'bg-white text-purple-900' : 'glass text-white hover:bg-white/20'
                  }`}
                >
                  {cat.emoji} {cat.name}
                </button>
              ))}
            </div>

            <AnimatePresence>
              {sortedIdeas.map((idea, index) => (
                <motion.div
                  key={idea.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="glass rounded-2xl p-6 mb-4 hover:bg-white/15 transition"
                >
                  <div className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <button
                        onClick={() => vote(idea.id)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-400 text-purple-900 w-12 h-12 rounded-full font-bold hover:scale-110 transition"
                      >
                        ▲
                      </button>
                      <span className="text-2xl font-bold mt-2">{idea.votes}</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">
                          {categories.find(c => c.name === idea.category)?.emoji}
                        </span>
                        <span className="text-sm text-gray-400">{idea.category}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-400">{idea.author}</span>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-400">
                          {Math.floor((Date.now() - idea.timestamp) / 60000)}m ago
                        </span>
                      </div>
                      <p className="text-lg mb-3">{idea.text}</p>
                      <button
                        onClick={() => enhance(idea)}
                        className="text-sm bg-purple-500/20 hover:bg-purple-500/30 px-4 py-2 rounded-lg transition"
                      >
                        ✨ AI Enhance
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass rounded-3xl p-6 sticky top-8"
            >
              <h3 className="text-2xl font-bold mb-6">🔥 Top Ideas</h3>
              {sortedIdeas.slice(0, 5).map((idea, i) => (
                <div key={idea.id} className="mb-4 pb-4 border-b border-white/10 last:border-0">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl font-bold text-yellow-400">#{i + 1}</span>
                    <div className="flex-1">
                      <p className="text-sm mb-1">{idea.text}</p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{idea.votes} votes</span>
                        <span>•</span>
                        <span>{idea.category}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </motion.div>

            {enhanced && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-3xl p-6 mt-6"
              >
                <h3 className="text-xl font-bold mb-4">✨ AI Enhanced</h3>
                <h4 className="font-bold mb-2">{enhanced.title}</h4>
                <p className="text-sm text-gray-300 mb-4">{enhanced.description}</p>
                <div className="text-sm">
                  <p className="font-semibold mb-2">Next Steps:</p>
                  <ul className="space-y-1 text-gray-300">
                    {enhanced.nextSteps?.map((step: string, i: number) => (
                      <li key={i}>• {step}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
