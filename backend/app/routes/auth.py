from flask import Blueprint, request, jsonify, current_app
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import User
from app import db
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    phone = data.get('phone')
    password = data.get('password')
    
    user = User.query.filter_by(phone=phone).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({
            'success': False,
            'message': '手机号或密码错误'
        }), 401
    
    token = jwt.encode({
        'user_id': user.id,
        'phone': user.phone,
        'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
    }, current_app.config['SECRET_KEY'])
    
    return jsonify({
        'success': True,
        'token': token,
        'nickname': user.nickname
    })

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    nickname = data.get('nickname')
    phone = data.get('phone')
    password = data.get('password')
    
    if User.query.filter_by(phone=phone).first():
        return jsonify({
            'success': False,
            'message': '该手机号已注册'
        }), 400
    
    hashed_password = generate_password_hash(password)
    new_user = User(nickname=nickname, phone=phone, password=hashed_password)
    
    try:
        db.session.add(new_user)
        db.session.commit()
        return jsonify({
            'success': True,
            'message': '注册成功'
        })
    except Exception as e:
        db.session.rollback()
        return jsonify({
            'success': False,
            'message': '注册失败'
        }), 500

@auth_bp.route('/wechat/login', methods=['GET'])
def wechat_login():
    auth_url = "https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID..."
    return jsonify({
        'success': True,
        'auth_url': auth_url
    })

@auth_bp.route('/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    phone = data.get('phone')
    
    # TODO: 实现发送重置密码短信或邮件的逻辑
    
    return jsonify({
        'success': True,
        'message': '重置密码链接已发送'
    }) 