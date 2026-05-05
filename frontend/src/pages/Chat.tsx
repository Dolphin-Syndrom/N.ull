import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, AlertTriangle, X } from 'lucide-react';

const CRISIS_KEYWORDS = ['suicide', 'kill myself', 'end it', 'hurt myself', 'cutting', 'die', 'no reason to live'];

interface Message {
  id: string;
  text: string;
  sender: 'me' | 'peer';
}

const Chat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [showCrisisBanner, setShowCrisisBanner] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const isAI = location.state?.aiFallback;

  useEffect(() => {
    if (isAI && messages.length === 0) {
      setTimeout(() => {
        setMessages([{ id: '1', text: "Hey. I'm here. What's on your mind?", sender: 'peer' }]);
      }, 1000);
    }
  }, [isAI, messages.length]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, showCrisisBanner]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    // Crisis Detection
    const lowerInput = input.toLowerCase();
    const hasCrisis = CRISIS_KEYWORDS.some(kw => lowerInput.includes(kw));
    if (hasCrisis) {
      setShowCrisisBanner(true);
    }

    const newMessage: Message = { id: Date.now().toString(), text: input.trim(), sender: 'me' };
    setMessages(prev => [...prev, newMessage]);
    setInput('');

    // Simulate AI reply if in AI mode
    if (isAI) {
      setTimeout(() => {
        setMessages(prev => [...prev, {
          id: (Date.now() + 1).toString(),
          text: "I'm listening. Tell me more.",
          sender: 'peer'
        }]);
      }, 1500);
    }
  };

  const disconnect = () => {
    // In real app, emit disconnect to socket here.
    navigate('/');
  };

  return (
    <div style={{ height: '100dvh', display: 'flex', flexDirection: 'column', position: 'relative' }}>
      
      {/* Header */}
      <header style={{ padding: 'clamp(1rem, 3vw, 1.5rem) clamp(1rem, 5vw, 2rem)', borderBottom: '1px solid var(--card)', background: 'var(--bg)D9', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backdropFilter: 'blur(10px)', zIndex: 10 }}>
        <div>
          <h2 style={{ fontSize: 'clamp(1.1rem, 4vw, 1.2rem)' }}>Stranger</h2>
          <p style={{ color: 'var(--muted)', fontSize: 'clamp(0.75rem, 3vw, 0.85rem)' }}>Feels "{location.state?.mood || 'Just venting'}"</p>
        </div>
        <button onClick={disconnect} style={{ padding: '0.4rem 0.8rem', border: '1px solid var(--rose)', color: 'var(--rose)', borderRadius: '20px', fontSize: 'clamp(0.75rem, 3vw, 0.85rem)' }}>
          Disconnect
        </button>
      </header>

      {/* Chat Area */}
      <div style={{ flex: 1, overflowY: 'auto', padding: 'clamp(1rem, 5vw, 2rem)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <AnimatePresence>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                alignSelf: msg.sender === 'me' ? 'flex-end' : 'flex-start',
                background: msg.sender === 'me' ? 'var(--violet)' : 'var(--card)',
                color: msg.sender === 'me' ? '#000' : 'var(--text)',
                padding: '0.8rem 1.2rem',
                borderRadius: '18px',
                borderBottomRightRadius: msg.sender === 'me' ? '4px' : '18px',
                borderBottomLeftRadius: msg.sender === 'peer' ? '4px' : '18px',
                maxWidth: '85%',
                wordWrap: 'break-word',
                lineHeight: '1.4',
                fontSize: 'clamp(0.9rem, 4vw, 1rem)'
              }}
            >
              {msg.text}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Inputs */}
      <div style={{ padding: 'clamp(1rem, 5vw, 1.5rem)', background: 'transparent' }}>
        <form onSubmit={handleSend} style={{ display: 'flex', gap: 'clamp(0.5rem, 2vw, 1rem)', background: 'var(--surface)', padding: '0.5rem', borderRadius: '30px', border: '1px solid var(--card)' }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Say exactly what you mean..."
            style={{ flex: 1, background: 'transparent', border: 'none', color: 'var(--text)', outline: 'none', padding: '0.5rem clamp(0.5rem, 3vw, 1rem)', fontSize: 'clamp(0.9rem, 4vw, 1rem)', fontFamily: 'inherit' }}
            autoFocus
          />
          <button type="submit" disabled={!input.trim()} style={{ background: input.trim() ? 'var(--violet)' : 'var(--card)', color: input.trim() ? '#000' : 'var(--muted)', minWidth: '40px', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s ease', flexShrink: 0 }}>
            <Send size={18} />
          </button>
        </form>
      </div>

      {/* Crisis Banner */}
      <AnimatePresence>
        {showCrisisBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            style={{
              position: 'absolute',
              bottom: 'clamp(80px, 15vh, 100px)',
              left: 'clamp(5%, 2vw, 1rem)',
              right: 'clamp(5%, 2vw, 1rem)',
              background: 'var(--card)',
              border: '1px solid var(--rose)',
              borderRadius: '12px',
              padding: 'clamp(1rem, 4vw, 1.5rem)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
              zIndex: 100
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div style={{ display: 'flex', gap: 'clamp(0.5rem, 3vw, 1rem)', color: 'var(--rose)' }}>
                <AlertTriangle size={24} style={{ flexShrink: 0 }} />
                <div>
                  <h3 style={{ fontSize: 'clamp(0.9rem, 4vw, 1rem)', marginBottom: '0.5rem', color: 'var(--text)' }}>You are not alone.</h3>
                  <p style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.9rem)', color: 'var(--muted)', marginBottom: '1rem' }}>
                    We noticed some phrases associated with crisis. If you need immediate help, please reach out to professionals.
                  </p>
                  <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
                    <a href="tel:988" style={{ background: 'var(--text)', color: '#000', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 500 }}>Call 988 (US)</a>
                    <a href="sms:741741&body=HOME" style={{ background: 'var(--card)', border: '1px solid var(--rose)', color: 'var(--text)', padding: '0.5rem 1rem', borderRadius: '6px', fontSize: '0.85rem' }}>Text HOME to 741741</a>
                  </div>
                </div>
              </div>
              <button onClick={() => setShowCrisisBanner(false)} style={{ color: 'var(--muted)', padding: '0.2rem', marginLeft: '0.5rem' }}><X size={20} /></button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Chat;
