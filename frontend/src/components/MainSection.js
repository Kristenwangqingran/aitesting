// src/components/MainSection.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Topics from '../pages/Topics';
import Projects from '../pages/Projects';
import Interviews from '../pages/Interviews';
import About from '../pages/About';

function MainSection() {
  return (
    <main>
      {/* 在这里定义页面路由 */}
      <Routes>
        <Route path="/topics" element={<Topics />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/interviews" element={<Interviews />} />
        <Route path="/about" element={<About />} />
        {/* 默认页面 */}
        <Route path="/" element={<h1>欢迎来到首页！</h1>} />
      </Routes>
    </main>
  );
}

export default MainSection;