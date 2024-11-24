from flask import Blueprint, request, jsonify, current_app, send_from_directory
from app.modules.jobs.models import Recruitment, JobSeeker
from app import db
import pdb
import os
from werkzeug.utils import secure_filename
from datetime import datetime

jobs_bp = Blueprint('jobs', __name__)

# 获取求职信息列表
@jobs_bp.route('/job-seekers', methods=['GET'])
def get_job_seekers():
    print("\n=== Job Seekers Route Accessed ===")
    
    try:
        print("Starting database query...")
        # 简化查询，只获取最新的10条记录
        job_seekers = JobSeeker.query.order_by(JobSeeker.created_at.desc()).limit(10).all()
        print(f"Query completed. Found {len(job_seekers)} records")
        
        result = [js.to_dict() for js in job_seekers]
        print("Data serialized successfully")
        
        response = jsonify({
            'success': True,
            'message': 'Successfully retrieved job seekers',
            'total': len(result),
            'data': result
        })
        
        # 添加响应头
        response.headers.add('Access-Control-Allow-Origin', '*')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
        response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
        
        return response
        
    except Exception as e:
        error_msg = f"Error in get_job_seekers: {str(e)}"
        print(error_msg)
        db.session.rollback()
        return jsonify({
            'success': False,
            'error': error_msg
        }), 500

# 发布求职信息
@jobs_bp.route('/job-seekers', methods=['POST'])
def create_job_seeker():
    try:
        resume_url = None
        if 'resume' in request.files:
            file = request.files['resume']
            if file and allowed_file(file.filename):
                filename = secure_filename(file.filename)
                timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
                filename = f"{timestamp}_{filename}"
                
                upload_dir = os.path.join(current_app.root_path, 'uploads', 'resumes')
                os.makedirs(upload_dir, exist_ok=True)
                
                file_path = os.path.join(upload_dir, filename)
                file.save(file_path)
                resume_url = f"/uploads/resumes/{filename}"

        new_job_seeker = JobSeeker(
            name=request.form['name'],
            position=request.form['position'],
            experience=request.form['experience'],
            expected_salary=request.form['expectedSalary'],
            location=request.form['location'],
            skills=request.form['skills'],
            resume_url=resume_url
        )
        
        db.session.add(new_job_seeker)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': '发布成功',
            'data': new_job_seeker.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        print(f"Error creating job seeker: {str(e)}")  # 调试信息
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# 获取招聘信息列表
@jobs_bp.route('/recruitments', methods=['GET'])
def get_recruitments():
    try:
        is_remote = request.args.get('remote', '').lower() == 'true'
        
        query = Recruitment.query
        if is_remote:
            query = query.filter_by(is_remote=True)
            
        recruitments = query.order_by(Recruitment.created_at.desc()).all()
        return jsonify({
            'success': True,
            'data': [r.to_dict() for r in recruitments]
        })
    
    except Exception as e:
        print(f"Error getting recruitments: {str(e)}")  # 调试信息
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# 发布招聘信息
@jobs_bp.route('/recruitments', methods=['POST'])
def create_recruitment():
    try:
        data = request.get_json()
        
        new_recruitment = Recruitment(
            job_title=data['jobTitle'],
            position=data['position'],
            job_type=data['jobType'],
            location=data['location'],
            salary=data['salary'],
            is_remote=data.get('isRemote', False),
            tags=data.get('tags', [])
        )
        
        db.session.add(new_recruitment)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': '发布成功',
            'data': new_recruitment.to_dict()
        }), 201
    
    except Exception as e:
        db.session.rollback()
        print(f"Error creating recruitment: {str(e)}")  # 调试信息
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

# 处理简历文件上传
def allowed_file(filename):
    ALLOWED_EXTENSIONS = {'pdf', 'doc', 'docx'}
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# 获取简历文件
@jobs_bp.route('/resumes/<path:filename>', methods=['GET'])
def get_resume(filename):
    try:
        return send_from_directory(
            os.path.join(current_app.root_path, 'uploads', 'resumes'),
            filename
        )
    except Exception as e:
        print(f"Error getting resume: {str(e)}")  # 调试信息
        return jsonify({
            'success': False,
            'error': str(e)
        }), 404