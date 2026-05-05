import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const Matching = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 30 seconds countdown
    const timer = setTimeout(() => {
      navigate('/chat', { state: { ...location.state, aiFallback: true } });
    }, 30000);

    return () => clearTimeout(timer);
  }, [navigate, location.state]);

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1rem, 5vw, 2rem)' }}>
      {/* Ripple Animation Context */}
      <div style={{ position: 'relative', width: 'clamp(100px, 30vw, 150px)', height: 'clamp(100px, 30vw, 150px)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '3rem' }}>
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
        <div style={{ width: 'clamp(30px, 8vw, 40px)', height: 'clamp(30px, 8vw, 40px)', borderRadius: '50%', background: 'var(--violet)', zIndex: 1 }} className="glow-text"></div>
      </div>

      <h2 style={{ fontSize: 'clamp(1.2rem, 5vw, 1.5rem)', marginBottom: '1rem', textAlign: 'center' }}>Searching for a match...</h2>
      <p style={{ color: 'var(--muted)', marginBottom: '3rem', textAlign: 'center', fontSize: 'clamp(0.9rem, 3.5vw, 1rem)' }}>Looking for someone who feels "{location.state?.mood || 'Just venting'}"</p>

      {/* Progress Bar */}
      <div style={{ width: '100%', maxWidth: '300px', height: '4px', background: 'var(--card)', borderRadius: '2px', overflow: 'hidden', marginBottom: '2rem' }}>
        <motion.div 
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: 30, ease: "linear" }}
          style={{ height: '100%', background: 'var(--violet)' }}
        />
      </div>
    </div>
  );
};

export default Matching;
