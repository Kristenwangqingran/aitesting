import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css'; // 引入样式

function HomePage() {
  return (
    <div className="home-page">
      <section className="hero">
        <div className="hero-content">
          <h1>AI驱动的测试技能，引领你的职业发展</h1>
          <p>探索AI赋能测试、实战项目经验，成为顶尖测试工程师</p>
          <Link to="/ai-enhanced" className="cta-button">开始探索</Link>
        </div>
      </section>

      <section className="features">
        <h2>我们提供</h2>
        <div className="feature-grid">
          <div className="feature-item">
            <i className="fas fa-robot"></i>
            <h3>AI赋能测试</h3>
            <p>掌握最新AI技术，提升测试效率</p>
            <Link to="/ai-enhanced" className="feature-link">了解更多</Link>
          </div>
          <div className="feature-item">
            <i className="fas fa-project-diagram"></i>
            <h3>项目实战</h3>
            <p>真实项目经验，提升实践能力</p>
            <Link to="/projects" className="feature-link">查看项目</Link>
          </div>
          <div className="feature-item">
            <i className="fas fa-user-tie"></i>
            <h3>大厂面试</h3>
            <p>独家面试技巧，助你成功入职</p>
            <Link to="/interviews" className="feature-link">面试攻略</Link>
          </div>
        </div>
      </section>

      <section className="about">
        <h2>关于我们</h2>
        <p>我们致力于将AI技术与软件测试相结合，为测试工程师提供最前沿的知识和工具。通过实战项目和面试指导，我们帮助你在竞争激烈的就业市场中脱颖而出。</p>
      </section>
    </div>
  );
}

export default HomePage;
