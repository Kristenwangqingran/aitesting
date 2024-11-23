import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InterviewsPage from './components/InterviewsPage';
import './App.css';
import AITestingTools from './components/AITestingTools';
import TestingProjects from './components/TestingProjects';
import About from './components/About';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <main className="App-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interviews" element={<InterviewsPage />} />
            <Route path="/ai-enhanced" element={<AITestingTools />} />
            <Route path="/projects" element={<TestingProjects />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;

