import React from 'react';
import './WechatQRCodeModal.css';

const WechatQRCodeModal = ({ qrCode, onClose }) => {
    return (
        <div className="wechat-qrcode-modal-overlay" onClick={onClose}>
            <div className="wechat-qrcode-modal-content" onClick={e => e.stopPropagation()}>
                <button className="wechat-qrcode-close-button" onClick={onClose}>×</button>
                <h3 className="wechat-qrcode-title">微信扫码登录</h3>
                <div className="wechat-qrcode-container">
                    <img 
                        src={`data:image/png;base64,${qrCode}`}
                        alt="WeChat QR Code"
                    />
                    <p>请使用微信扫描二维码登录</p>
                    <p>请在微信中点击确认以登录</p>
                </div>
            </div>
        </div>
    );
};

export default WechatQRCodeModal; 