from flask import Blueprint, request, jsonify, current_app, session
from werkzeug.security import generate_password_hash, check_password_hash
from app.modules.auth.models import User
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