import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InterviewsPage from './components/InterviewsPage';
import './App.css';
import AITestingTools from './components/AITestingTools';
import TestingProjects from './components/TestingProjects';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="App-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/interviews" element={<InterviewsPage />} />
            <Route path="/ai-enhanced" element={<AITestingTools />} />
            <Route path="/projects" element={<TestingProjects />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

// 临时的 ComingSoon 组件，用于尚未实现的页面
function ComingSoon() {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h2>Coming Soon</h2>
      <p>This page is under construction. Please check back later.</p>
    </div>
  );
}

export default App;
