// Login.js
import React from 'react';
import './Login.css'; // 引入 CSS 文件

const Login = () => {
  return (
    <div className="login-container">
      <h2>登录页面</h2>
      <form>
        <div>
          <label>手机号:</label>
          <input type="text" name="username" required />
        </div>
        <div>
          <label>密码:</label>
          <input type="password" name="password" required />
        </div>
        <button type="submit">提交</button>
      </form>
    </div>
  );
};

export default Login;
