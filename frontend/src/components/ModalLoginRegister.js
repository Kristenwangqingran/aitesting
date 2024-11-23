import React, { useState } from 'react';
import './ModalLoginRegister.css';
import { Form, Input, Button, message } from 'antd';
import WechatQRCodeModal from './WechatQRCodeModal';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

const ModalLoginRegister = ({ onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [nickname, setNickname] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);
  const [isSending, setIsSending] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [wechatQRCode, setWechatQRCode] = useState(null);
  const [showQRCode, setShowQRCode] = useState(false);

  const handleSendVerificationCode = async () => {
    if (isSending) return;
    
    try {
        setIsSending(true);
        const response = await fetch(`${API_BASE_URL}/api/auth/send-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({
                phone: phone
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            message.success('验证码已发送');
            setCountdown(60);
            
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        setIsSending(false);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        } else {
            message.error(data.message || '发送失败');
            setIsSending(false);
        }
    } catch (error) {
        console.error('发送验证码失败:', error);
        message.error('发送验证码失败');
        setIsSending(false);
    }
  };

  const handleVerifyCode = async () => {
    try {
        const verifyResponse = await fetch(`${API_BASE_URL}/api/auth/verify-sms`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify({
                phone,
                code: verificationCode
            })
        });
        
        const verifyData = await verifyResponse.json();
        return verifyData;
    } catch (error) {
        console.error('验证码验证失败:', error);
        throw error;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isLogin) {  // 注册流程
        // 1. 基本验证
        if (!nickname || !phone || !verificationCode || !password) {
          message.error('请填写所有必填项');
          return;
        }

        if (!/^1[3-9]\d{9}$/.test(phone)) {
          message.error('请输入正确的手机号格式');
          return;
        }

        if (password.length < 6) {
          message.error('密码长度不能少于6位');
          return;
        }

        // 2. 验证短信验证码
        const verifyResponse = await fetch(`${API_BASE_URL}/api/auth/verify-sms`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',  // 添加这行
          body: JSON.stringify({
            phone,
            code: verificationCode
          })
        });
        
        const verifyData = await verifyResponse.json();
        
        // 3. 如果验证码正确，直接进行注册
        if (verifyData.success) {
          const registerResponse = await fetch(`${API_BASE_URL}/api/auth/register`, {
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
          
          const registerData = await registerResponse.json();
          if (registerData.success) {
            message.success('注册成功！');
            setIsLogin(true);  // 注册成功后切换到登录界面
          } else {
            message.error(registerData.message || '注册失败');
          }
        } else {
          message.error('验证码错误');
        }
      } else {
        const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            phone,
            password
          })
        });
        const data = await response.json();
        if (data.success) {
          localStorage.setItem('token', data.token);
          message.success('登录成功');
          onClose();
        } else {
          message.error(data.message);
        }
      }
    } catch (error) {
      message.error(error.message || '操作失败');
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
        const response = await fetch(`${API_BASE_URL}/api/auth/wechat/login/url`, {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('微信登录响应:', data);
        
        if (data.success && data.qr_code) {
            setWechatQRCode(data.qr_code);
            setShowQRCode(true);
        } else {
            message.error(data.message || '获取微信二维码失败');
        }
    } catch (error) {
        console.error('获取微信二维码失败:', error);
        message.error('获取微信二维码失败，请稍后重试');
    }
  };

  const toggleMode = () => setIsLogin(!isLogin);

  const renderSendButton = () => {
    if (countdown > 0) {
        return <Button disabled>{countdown}秒后重新发送</Button>;
    }
    return (
        <Button 
            onClick={handleSendVerificationCode}
            disabled={isSending || !phone || phone.length !== 11}
        >
            {isSending ? '发送中...' : '发送验证码'}
        </Button>
    );
  };

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
            {!isLogin && (
              <div className="verification-code">
                <input
                  type="text"
                  placeholder="验证码"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                />
                {renderSendButton()}
              </div>
            )}
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit" className="submit-button">
              {isLogin ? '快速登录' : '快速注册'}
            </button>
          </form>
          <div className="login-options">
            <a href="#" onClick={(e) => { e.preventDefault(); }}>忘记密码？</a>
            <a href="#" onClick={(e) => { e.preventDefault(); toggleMode(); }}>
              {isLogin ? '新用? 注册' : '已有账号? 登录'}
            </a>
            <button 
              className="wechat-login-btn"
              onClick={handleWechatLogin}
            >
              微信登录
            </button>
          </div>
        </div>
      </div>
      {showQRCode && wechatQRCode && (
        <WechatQRCodeModal 
          qrCode={wechatQRCode} 
          onClose={() => setShowQRCode(false)}
        />
      )}
    </div>
  );
};

export default ModalLoginRegister;