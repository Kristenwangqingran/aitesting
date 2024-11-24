import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  return (
    <header className="header">
      <div className="navbar">
        <nav>
          <ul>
            <li><Link to="/jobs">测试求职</Link></li>
            <li><Link to="/projects">项目实战</Link></li>
            <li><Link to="/interviews">大厂面试</Link></li>
            <li><Link to="/about">关于我们</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
