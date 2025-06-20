import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { Learn } from './pages/Learn';
import { Banks } from './pages/Banks';
import { Locator } from './pages/Locator';
import { Stories } from './pages/Stories';
import { Events } from './pages/Events';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-ivory">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learn" element={<Learn />} />
            <Route path="/banks" element={<Banks />} />
            <Route path="/locator" element={<Locator />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/events" element={<Events />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;