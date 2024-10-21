import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // 引入样式

function Header() {
  return (
    <header className="header">
      <div className="navbar">
        <h1 className="logo">KristenWang</h1>
        <nav>
          <ul>
            <li><Link to="/ai-empowerment">AI赋能</Link></li>
            <li><Link to="/projects">项目实战</Link></li>
            <li><Link to="/interviews">大厂面试</Link></li>
            <li><Link to="/about">关于</Link></li>
          </ul>
        </nav>
        <button className="login-btn">登录</button>
      </div>
    </header>
  );
}

export default Header;
