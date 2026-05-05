import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [ageChecked, setAgeChecked] = useState(false);
  const [guidelinesChecked, setGuidelinesChecked] = useState(false);
  const navigate = useNavigate();

  const handleEnter = () => {
    if (ageChecked && guidelinesChecked) {
      navigate('/preferences');
    }
  };

  const isEnabled = ageChecked && guidelinesChecked;

  return (
    <div style={{ minHeight: '100dvh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'clamp(1rem, 5vw, 2rem)' }}>
      <header style={{ textAlign: 'center', marginBottom: 'clamp(2rem, 8vw, 4rem)', animation: 'riseUp 0.8s ease forwards' }}>
        <h1 className="glow-text" style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)', marginBottom: '1rem', fontStyle: 'italic', letterSpacing: '0.05em' }}>
          N.ull
        </h1>
        <p style={{ color: 'var(--muted)', fontSize: 'clamp(1rem, 3vw, 1.2rem)', maxWidth: '600px', margin: '0 auto' }}>
          Someone is listening. No names. No profiles. No history. Just two people, one conversation.
        </p>
      </header>

      <div style={{ background: 'var(--surface)', padding: 'clamp(1.5rem, 5vw, 2.5rem)', borderRadius: '12px', border: '1px solid var(--card)', width: '100%', maxWidth: '420px', animation: 'riseUp 1s ease forwards', opacity: 0 }}>
        <h3 style={{ marginBottom: '1.5rem', fontSize: 'clamp(1.2rem, 4vw, 1.4rem)', borderBottom: '1px solid var(--card)', paddingBottom: '1rem' }}>Enter the Void</h3>
        
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem' }}>
          <input 
            type="checkbox" 
            id="age" 
            checked={ageChecked}
            onChange={(e) => setAgeChecked(e.target.checked)}
            style={{ marginTop: '0.3rem', accentColor: 'var(--violet)', width: '1.2rem', height: '1.2rem' }}
          />
          <label htmlFor="age" style={{ color: 'var(--text)', fontSize: '0.95rem', cursor: 'pointer' }}>
            I am at least 18 years old and agree to the Terms of Service.
          </label>
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '2.5rem' }}>
          <input 
            type="checkbox" 
            id="guidelines" 
            checked={guidelinesChecked}
            onChange={(e) => setGuidelinesChecked(e.target.checked)}
            style={{ marginTop: '0.3rem', accentColor: 'var(--violet)', width: '1.2rem', height: '1.2rem' }}
          />
          <label htmlFor="guidelines" style={{ color: 'var(--text)', fontSize: '0.95rem', cursor: 'pointer' }}>
            I acknowledge this is a community care space. I will navigate with empathy.
          </label>
        </div>

        <button 
          onClick={handleEnter}
          disabled={!isEnabled}
          style={{
            width: '100%',
            padding: '1rem',
            background: isEnabled ? 'var(--violet)' : 'var(--card)',
            color: isEnabled ? '#000' : 'var(--muted)',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            opacity: isEnabled ? 1 : 0.6,
            cursor: isEnabled ? 'pointer' : 'not-allowed'
          }}
        >
          Enter
        </button>
      </div>
    </div>
  );
};

export default Home;
