import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-row">
        <div className="footer-column">
          <h3>KristenWang</h3>
          <p>王清然 | KristenWang，8年+大厂测试经验，公司资深面试官</p>
          <p>曾就职于人工智能独角兽公司：商汤科技，有丰富的软件测试</p>
          <p>实践经验，熟悉AI赋能软件测试</p>
        </div>
        <div className="footer-column">
          <h3>快速导航</h3>
          <ul>
            <li><a href="/ai-empowerment">AI赋能</a></li>
            <li><a href="/projects">项目实战</a></li>
            <li><a href="/interviews">大厂面试</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>联系我</h3>
          <ul>
            <li><a href="/about">关于我</a></li>
            <li><a href="/contact">联系我</a></li>
            <li><a href="/message">留言我</a></li>
          </ul>
        </div>
      </div>
      <div className="footer-row">
        <p>备案号：<a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2024294126号</a></p>
      </div>
    </footer>
  );
}

export default Footer;
