import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GENDERS = ['Male', 'Female', 'Non-binary', 'Prefer not to say'];
const PREFERENCES = ['Male only', 'Female only', 'Anyone'];
const MOODS = ['Overwhelmed', 'Lonely', 'Anxious', 'Numb', 'Grieving', 'Restless', 'Just venting'];

const Preferences = () => {
  const [identity, setIdentity] = useState('');
  const [preference, setPreference] = useState('');
  const [mood, setMood] = useState('');
  const navigate = useNavigate();

  const isReady = identity && preference && mood;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <div style={{ background: 'var(--surface)', padding: '2.5rem', borderRadius: '12px', border: '1px solid var(--card)', width: '100%', maxWidth: '500px', animation: 'riseUp 0.8s ease forwards' }}>
        <h2 style={{ fontSize: '1.8rem', marginBottom: '0.5rem' }}>Who are you right now?</h2>
        <p style={{ color: 'var(--muted)', marginBottom: '2rem', fontSize: '0.95rem' }}>This information is used strictly for finding a matching peer. It is never saved or linked to you.</p>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text)' }}>I am</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {GENDERS.map(g => (
              <button 
                key={g}
                onClick={() => setIdentity(g)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${identity === g ? 'var(--violet)' : 'var(--card)'}`,
                  background: identity === g ? 'var(--vdim)' : 'transparent',
                  color: identity === g ? 'var(--text)' : 'var(--muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {g}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text)' }}>I want to talk to</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {PREFERENCES.map(p => (
              <button 
                key={p}
                onClick={() => setPreference(p)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${preference === p ? 'var(--violet)' : 'var(--card)'}`,
                  background: preference === p ? 'var(--vdim)' : 'transparent',
                  color: preference === p ? 'var(--text)' : 'var(--muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <h4 style={{ marginBottom: '1rem', color: 'var(--text)' }}>My current mood</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem' }}>
            {MOODS.map(m => (
              <button 
                key={m}
                onClick={() => setMood(m)}
                style={{
                  padding: '0.6rem 1rem',
                  borderRadius: '20px',
                  border: `1px solid ${mood === m ? 'var(--violet)' : 'var(--card)'}`,
                  background: mood === m ? 'var(--vdim)' : 'transparent',
                  color: mood === m ? 'var(--text)' : 'var(--muted)',
                  transition: 'all 0.2s ease'
                }}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <button 
          disabled={!isReady}
          onClick={() => navigate('/matching', { state: { identity, preference, mood } })}
          style={{
            width: '100%',
            padding: '1rem',
            background: isReady ? 'var(--violet)' : 'var(--card)',
            color: isReady ? '#000' : 'var(--muted)',
            borderRadius: '6px',
            fontSize: '1rem',
            fontWeight: 500,
            transition: 'all 0.3s ease',
            opacity: isReady ? 1 : 0.6,
            cursor: isReady ? 'pointer' : 'not-allowed'
          }}
        >
          Begin Search
        </button>
      </div>
    </div>
  );
};

export default Preferences;
