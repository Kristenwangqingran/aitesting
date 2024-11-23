import React, { useState } from 'react';
import './ModalLoginRegister.css';

const ModalLoginRegister = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        const response = await fetch(`${API_BASE_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone,
            password
          })
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            localStorage.setItem('token', data.token);
            onClose();
          }
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/register`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            nickname,
            phone,
            password
          })
        });
        if (response.ok) {
          alert('注册成功！');
          setIsLogin(true);
        }
      }
    } catch (error) {
      alert(error.message || '操作失败');
    }
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    if (!phone) {
      alert('请输入手机号');
      return;
    }
    try {
      const response = await fetch(`${API_BASE_URL}/forgot-password`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          phone
        })
      });
      if (response.ok) {
        alert('重置密码链接已发送到您的手机');
      }
    } catch (error) {
      alert('发送重置密码请求失败');
    }
  };

  const handleWechatLogin = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/wechat/login`);
      window.location.href = response.auth_url;
    } catch (error) {
      alert('微信登录失败');
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>×</button>
        <div className="left-panel">
          <h2>欢迎来到kristenwang</h2>
          <ul>
            <li>8年+大厂架构经验分享</li>
            <li>全面深入50W+年薪技能</li>
            <li>构建AI赋能测试能力</li>
            <li>面试干货，每日更新</li>
            <li>面试经验，定期分享</li>
          </ul>
        </div>
        <div className="right-panel">
          <h2>kristenwang</h2>
          <p className="subtitle">{isLogin ? '登录' : '注册'}</p>
          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <input
                type="text"
                placeholder="可爱的昵称"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
              />
            )}
            <input
              type="text"
              placeholder="登录手机号"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && <span className="note">用作登录</span>}
            <button type="submit" className="submit-button">
              {isLogin ? '快速登录' : '快速注册'}
            </button>
          </form>
          <div className="login-options">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>忘记密码？</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
              {isLogin ? '新用户? 注册' : '已有账号? 登录'}
            </a>
          </div>
          {isLogin && (
            <div className="wechat-login">
              <span>推荐登录：</span>
              <button className="wechat-button">
              <svg className="wechat-icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
                    <path d="M692.3 336.2c11.2 0 22.3 0.8 33.2 2.1-29.8-138.9-178.4-242.1-348.4-242.1-190.2 0-345.6 129.4-345.6 292.7 0 94.4 51.5 171.9 137.6 232.1l-34.4 103.4 120.3-60.2c43 8.5 77.5 17.2 120.6 17.2 10.8 0 21.5-0.5 32.1-1.4-6.7-23-10.6-47.1-10.6-72.1 0.1-150.8 129.5-271.7 295.2-271.7z m-186.5-93.5c25.9 0 46.9 21 46.9 46.9s-21 46.9-46.9 46.9c-25.9 0-51.8-21-51.8-46.9 0-25.9 25.9-46.9 51.8-46.9zM304.9 336.6c-25.9 0-51.8-21-51.8-46.9s25.9-46.9 51.8-46.9 46.9 21 46.9 46.9c0.1 25.8-21 46.9-46.9 46.9z" fill="#ffffff"></path>
                    <path d="M1010.4 610.6c0-137.3-137.6-249-292.3-249-163.7 0-292.5 111.7-292.5 249 0 137.6 128.8 249 292.5 249 34.2 0 68.6-8.7 103-17.2L924 874.5l-25.7-77.5c86.3-60.2 112.1-137.6 112.1-186.4z m-385.7-42.3c-17.2 0-34.4-17.2-34.4-34.4 0-17.2 17.2-34.4 34.4-34.4 25.9 0 43.1 17.2 43.1 34.4 0 17.2-17.2 34.4-43.1 34.4z m189.9 0c-17.2 0-34.3-17.2-34.3-34.4 0-17.2 17.2-34.4 34.3-34.4 25.9 0 43.2 17.2 43.2 34.4 0 17.2-17.3 34.4-43.2 34.4z" fill="#ffffff"></path>
              </svg> 微信
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalLoginRegister;