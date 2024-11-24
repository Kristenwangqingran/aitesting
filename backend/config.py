import os
from datetime import timedelta

class Config:
    SECRET_KEY = 'your-secret-key'
    
    # MySQL 配置
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = 'shopee'
    MYSQL_HOST = 'localhost'
    MYSQL_DB = 'aics_database'
    
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:shopee@localhost:3306/aics_database'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    DEBUG = True
    
    # 允许跨域
    CORS_HEADERS = 'Content-Type'
    
    # Session 配置 - 生产环境加强安全性
    SESSION_TYPE = 'filesystem'
    SESSION_COOKIE_SECURE = True  # 只在 HTTPS 下发送 cookie
    SESSION_COOKIE_HTTPONLY = True  # 防止 JavaScript 访问 cookie
    SESSION_COOKIE_SAMESITE = 'Strict'  # 防止 CSRF 攻击
    PERMANENT_SESSION_LIFETIME = timedelta(days=1)  # session 过期时间
    
    # 文件上传配置
    UPLOAD_FOLDER = '/var/www/aics_database/uploads'  # 生产环境的上传路径
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16MB
    ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
    
    # 日志配置
    LOG_FILE = "/var/log/aics_database/app.log"
    LOGGING_CONFIG = {
        'version': 1,
        'handlers': {
            'file': {
                'class': 'logging.handlers.RotatingFileHandler',
                'filename': LOG_FILE,
                'maxBytes': 10485760,  # 10MB
                'backupCount': 10,
                'formatter': 'default'
            },
        },
        'formatters': {
            'default': {
                'format': '%(asctime)s - %(name)s - %(levelname)s - %(message)s'
            },
        },
        'root': {
            'level': 'INFO',
            'handlers': ['file']
        }
    }
    
    WECHAT_APP_ID = os.getenv('WECHAT_APP_ID', 'your_app_id')
    WECHAT_APP_SECRET = os.getenv('WECHAT_APP_SECRET', 'your_app_secret')
    WECHAT_REDIRECT_URI = os.getenv('WECHAT_REDIRECT_URI', 'http://your_domain/api/auth/wechat/callback')


