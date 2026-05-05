import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    // 30 seconds countdown
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          navigate('/chat', { state: { ...location.state, aiFallback: true } });
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate, location.state]);

  const handleSkipToAI = () => {
    navigate('/chat', { state: { ...location.state, aiFallback: true } });
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      {/* Ripple Animation Context */}
      <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ scale: 0.2, opacity: 0.8 }}
            animate={{ scale: 3, opacity: 0 }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 1,
              ease: "easeOut"
            }}
            style={{
              position: 'absolute',
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              border: '2px solid var(--violet)',
              boxSizing: 'border-box'
            }}
          />
        ))}
        <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--violet)', zIndex: 1 }} className="glow-text"></div>
      </div>

      <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Searching for a match...</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '3rem' }}>Looking for someone who feels "{location.state?.mood || 'Just venting'}"</p>

      {/* Progress Bar */}
      <div style={{ width: '100%', maxWidth: '300px', height: '4px', background: 'var(--card)', borderRadius: '2px', overflow: 'hidden', marginBottom: '2rem' }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 30, ease: "linear" }}
          style={{ height: '100%', background: 'var(--violet)' }}
        />
      </div>

      <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '2rem' }}>Connecting to AI companion in {timeLeft}s</p>

      <button 
        onClick={handleSkipToAI}
        style={{
          padding: '0.8rem 1.5rem',
          borderRadius: '20px',
          border: '1px solid var(--card)',
          color: 'var(--text)',
          fontSize: '0.9rem',
          transition: 'all 0.2s ease',
        }}
        onMouseOver={e => e.currentTarget.style.border = '1px solid var(--violet)'}
        onMouseOut={e => e.currentTarget.style.border = '1px solid var(--card)'}
      >
        Skip and talk to AI now
      </button>
    </div>
  );
};

export default Matching;
