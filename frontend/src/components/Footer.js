import React from 'react';
import './Footer.css';
import qrcode from '../assets/qrcode.jpg';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-row">
          <div className="footer-column">
            <h3>KristenWang</h3>
            <div className="footer-content">
              <p>8年+大厂测试经验，公司资深面试官</p>
              <p>曾就职于人工智能独角兽公司：商汤科技，AI赋能测试专家</p>
            </div>
          </div>
          <div className="footer-column">
            <h3>快速导航</h3>
            <div className="footer-content">
              <ul>
                <li><a href="/ai-enhanced">AI赋能测试</a></li>
                <li><a href="/projects">项目实战</a></li>
                <li><a href="/interviews">大厂面试</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-column">
            <h3>公众号</h3>
            <div className="footer-content">
              <img 
                src={qrcode} 
                alt="公众号二维码" 
                className="qrcode-image"
              />
            </div>
          </div>
        </div>
        <div className="footer-row">
          <span>备案号：</span>
          <a href="http://beian.miit.gov.cn/" target="_blank" rel="noopener noreferrer">粤ICP备2024294126号</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;