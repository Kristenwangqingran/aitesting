import React, { useState } from 'react'; // 在这里导入 useState
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import InterviewsPage from './components/InterviewsPage';
import './App.css';
import AITestingTools from './components/AITestingTools';
import TestingProjects from './components/TestingProjects';
import About from './components/About';
import ModalLoginRegister from './components/ModalLoginRegister'; // 引入Modal组件

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false); // 用来控制弹框是否显示
  const openModal = () => setIsModalOpen(true); // 打开弹框
  const closeModal = () => setIsModalOpen(false); // 关闭弹框
  return (
    <Router>
      <div className="App">
        {/* 将 openModal 传递给 Header */}
        <Header openModal={openModal} />
        {isModalOpen && <ModalLoginRegister onClose={closeModal} />} {/* 控制 Modal 的显示 */}
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
    </Router>
  );
}

export default App;

