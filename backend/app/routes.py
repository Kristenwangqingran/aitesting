from flask import Blueprint, request, jsonify
from app.models import User
from app import db
from app.utils import validate_phone

main = Blueprint('main', __name__)

@main.route('/register', methods=['POST'])
def register():
    data = request.json
    nickname = data.get('nickname')
    phone = data.get('phone')
    password = data.get('password')

    if not all([nickname, phone, password]):
        return jsonify({'message': '所有字段都是必填的'}), 400

    if not validate_phone(phone):
        return jsonify({'message': '无效的手机号码'}), 400

    if User.query.filter_by(phone=phone).first():
        return jsonify({'message': '该手机号已被注册'}), 400

    new_user = User(nickname=nickname, phone=phone)
    new_user.set_password(password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({'message': '注册成功'}), 201

@main.route('/login', methods=['POST'])
def login():
    data = request.json
    phone = data.get('phone')
    password = data.get('password')

    if not all([phone, password]):
        return jsonify({'message': '手机号和密码都是必填的'}), 400

    user = User.query.filter_by(phone=phone).first()
    if user and user.check_password(password):
        return jsonify({'message': '登录成功', 'nickname': user.nickname}), 200
    
    return jsonify({'message': '手机号或密码错误'}), 401