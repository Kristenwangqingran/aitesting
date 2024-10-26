import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AIEnhancedPage from './pages/AIEnhancedPage';
import Header from './components/Header';
import HomePage from './components/HomePage';
import InterviewPage from './components/InterviewPage';
import TestingProjects from './components/TestingProjects'; // 新增导入
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/interviews" element={<InterviewPage />} />
          <Route path="/ai-enhanced" element={<AIEnhancedPage />} />
          <Route path="/projects" element={<TestingProjects />} /> {/* 新增路由 */}
          {/* Add other routes as needed */}
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;