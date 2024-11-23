from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
from datetime import timedelta
from flask_session import Session

# 初始化 SQLAlchemy
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    app.config.from_object('config.Config')
    
    db.init_app(app)
    migrate.init_app(app, db)
    
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
    
    # 不需要 create_all() 因为我们使用 migrations
    return app