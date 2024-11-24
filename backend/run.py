from app import create_app
import logging
import sys

# 配置日志
logging.basicConfig(
    level=logging.DEBUG,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    handlers=[
        logging.StreamHandler(sys.stdout)
    ]
)
logger = logging.getLogger(__name__)

try:
    print("\n=== Starting Application ===")
    logger.info("Creating Flask application...")
    app = create_app()
    
    if __name__ == '__main__':
        print("\n=== Running Server ===")
        logger.info("Starting Flask server...")
        
        # 启动服务器
        app.run(
            host='0.0.0.0',
            port=8080,
            debug=True,
            threaded=True,
            use_reloader=True
        )
except Exception as e:
    logger.error(f"Failed to start application: {str(e)}", exc_info=True)
    sys.exit(1)