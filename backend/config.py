import os

class Config:
    SECRET_KEY = 'your-secret-key'
    
    # MySQL 配置
    MYSQL_USER = 'root'  # 修改为您的 MySQL 用户名
    MYSQL_PASSWORD = 'your_password'  # 修改为您的 MySQL 密码
    MYSQL_HOST = 'localhost'
    MYSQL_DB = 'flask_app'  # 数据库名称
    
    SQLALCHEMY_DATABASE_URI = f'mysql+pymysql://{MYSQL_USER}:{MYSQL_PASSWORD}@{MYSQL_HOST}/{MYSQL_DB}'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    
    # Session 配置
    SESSION_TYPE = 'filesystem'
    SESSION_COOKIE_SAMESITE = 'Lax'
    SESSION_COOKIE_SECURE = False
    
    # 日志配置
    LOG_FILE = "app.log"
    LOGGING_CONFIG = {
        'version': 1,
        'handlers': {
            'file': {
                'class': 'logging.FileHandler',
                'filename': LOG_FILE,
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