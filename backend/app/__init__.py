from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS
import os
from config import Config
import pdb
import logging

# 配置日志
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

# 创建数据库实例
db = SQLAlchemy()
migrate = Migrate()

def create_app():
    app = Flask(__name__)
    
    print("=== Starting Flask Application ===")
    
    # 从 Config 类加载配置
    app.config.from_object(Config)
    print("Configuration loaded")
    
    # 更宽松的 CORS 配置
    CORS(app, resources={
        r"/*": {
            "origins": "*",
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "Accept", "Origin"],
            "supports_credentials": True,
            "max_age": 3600
        }
    })
    print("CORS initialized")
    
    # 初始化数据库
    db.init_app(app)
    migrate.init_app(app, db)
    print("Database initialized")
    
    @app.before_request
    def log_request_info():
        print("\n=== Request Details ===")
        print(f"Method: {request.method}")
        print(f"URL: {request.url}")
        print(f"Headers: {dict(request.headers)}")
        print(f"Arguments: {dict(request.args)}")
        print("=== End Request Details ===\n")
    
    @app.after_request
    def after_request(response):
        print("\n=== Response Details ===")
        print(f"Status: {response.status}")
        print(f"Headers: {dict(response.headers)}")
        print("=== End Response Details ===\n")
        return response
    
    # 添加一个测试路由到主应用
    @app.route('/test')
    def test():
        print("Test route accessed")
        return jsonify({"message": "Test route works!"})
    
    # 注册蓝图
    print("Registering blueprints...")
    from app.modules.jobs.routes import jobs_bp
    app.register_blueprint(jobs_bp, url_prefix='/api/jobs')
    
    # 打印所有注册的路由
    print("\n=== Registered Routes ===")
    for rule in app.url_map.iter_rules():
        print(f"Route: {rule.rule}, Methods: {rule.methods}")
    print("=== End Registered Routes ===\n")
    
    return app