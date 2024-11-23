from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
import logging

db = SQLAlchemy()

# 配置日志
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # 配置CORS
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000"],
            "methods": ["GET", "POST", "OPTIONS"],
            "allow_headers": ["Content-Type"],
            "supports_credentials": True,
            "expose_headers": ["Content-Type"]
        }
    })

    # 初始化扩展
    db.init_app(app)

    # 注册蓝图
    from app.routes.auth import auth_bp
    app.register_blueprint(auth_bp, url_prefix='/api/auth')

    # 创建数据库表
    with app.app_context():
        db.create_all()

    # 在需要调试的地方使用
    logger.debug("这是一条调试信息")
    logger.info("这是一条信息")
    logger.error("这是一条错误信息")

    return app