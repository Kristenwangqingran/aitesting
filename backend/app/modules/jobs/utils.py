from werkzeug.utils import secure_filename
import os
import logging

logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

def save_resume(file):
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
        filename = f"{timestamp}_{filename}"
        
        upload_dir = os.path.join(current_app.root_path, 'uploads', 'resumes')
        os.makedirs(upload_dir, exist_ok=True)
        
        file_path = os.path.join(upload_dir, filename)
        file.save(file_path)
        return f"/uploads/resumes/{filename}"
    return None 

def get_job_seekers():
    logger.debug("Starting get_job_seekers function")
    try:
        # 添加一些测试数据
        data = [
            {"id": 1, "name": "Test User 1", "position": "Software Engineer"},
            {"id": 2, "name": "Test User 2", "position": "Data Scientist"}
        ]
        logger.debug(f"Successfully retrieved job seekers: {data}")
        return data
    except Exception as e:
        logger.error(f"Error in get_job_seekers: {str(e)}")
        raise 