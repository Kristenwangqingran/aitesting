from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import timedelta
from flask_session import Session

# 初始化 SQLAlchemy
db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    # 基础配置
    app.config.update(
        SECRET_KEY='your-secret-key-here',
        SQLALCHEMY_DATABASE_URI='sqlite:///app.db',
        SQLALCHEMY_TRACK_MODIFICATIONS=False,
        
        # Session 配置
        SESSION_TYPE='filesystem',
        SESSION_FILE_DIR='flask_session',
        SESSION_PERMANENT=True,
        PERMANENT_SESSION_LIFETIME=timedelta(minutes=5),
        SESSION_COOKIE_SECURE=False,
        SESSION_COOKIE_HTTPONLY=True,
        SESSION_COOKIE_SAMESITE='Lax'
    )
    
    # 初始化扩展
    db.init_app(app)
    Session(app)
    
    # CORS 配置
    CORS(app, 
         supports_credentials=True,
         resources={
             r"/api/*": {
                 "origins": ["http://localhost:3000"],
                 "methods": ["GET", "POST", "OPTIONS"],
                 "allow_headers": ["Content-Type"],
                 "expose_headers": ["Set-Cookie"],
                 "supports_credentials": True
             }
         })
    
    # 注册蓝图
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    
    # 创建数据库表
    with app.app_context():
        db.create_all()
    
    return app