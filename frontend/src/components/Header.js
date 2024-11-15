import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 引入样式

function Header({ openModal }) { // 接收 openModal 作为 props
  return (
    <header className="header">
      <div className="navbar">
        <h1 className="logo">KristenWang</h1>
        <nav>
          <ul>
            <li><Link to="/ai-enhanced">AI赋能测试</Link></li>
            <li><Link to="/projects">项目实战</Link></li>
            <li><Link to="/interviews">大厂面试</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </nav>
        {/* 在点击时调用 openModal 函数 */}
        <button className="login-btn" onClick={openModal}>登录</button>
      </div>
    </header>
  );
}

export default Header;
