import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Background } from './components/Background';
import Home from './pages/Home';
import Preferences from './pages/Preferences';
import Matching from './pages/Matching';
import Chat from './pages/Chat';

function App() {
  return (
    <Router>
      <Background />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/matching" element={<Matching />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
