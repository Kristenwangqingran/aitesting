from flask import Blueprint, request, jsonify, current_app, session
from werkzeug.security import generate_password_hash, check_password_hash
from app.models.user import User
from app import db
import jwt
import datetime
import random
import string
import base64
import logging

auth_bp = Blueprint('auth', __name__)

def generate_verification_code():
    """生成6位数字验证码"""
    return ''.join(random.choices('0123456789', k=6))

@auth_bp.route('/login', methods=['POST'])
def login():
    # import pdb; pdb.set_trace()
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

    auth_url = "https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID..."
    return jsonify({
        'success': True,
        'auth_url': auth_url
    })

    data = request.get_json()
    phone = data.get('phone')
    
    # TODO: 实现发送重置密码短信或邮件的逻辑
    
    return jsonify({
        'success': True,
        'message': '重置密码链接已发送'
    })

    # 生成随机验证码
    characters = string.digits + string.ascii_uppercase
    captcha_text = ''.join(random.choice(characters) for _ in range(4))
    
    # 将验证码存入 session
    session['captcha'] = captcha_text
    
    # 生成图片
    image = ImageCaptcha()
    image_data = image.generate(captcha_text)
    
    # 转换为 base64
    buffered = BytesIO()
    image_data.save(buffered, format="PNG")
    img_str = base64.b64encode(buffered.getvalue()).decode()
    
    return jsonify({
        'success': True,
        'captcha': f"data:image/png;base64,{img_str}"
    })

@auth_bp.route('/send-sms', methods=['POST'])
def send_sms():
    try:
        data = request.get_json()
        phone = data.get('phone')
        
        if not phone:
            return jsonify({'success': False, 'message': '手机号码不能为空'}), 400
            
        # 生成验证码
        code = generate_verification_code()
        
        # 设置 session
        session.permanent = True  # 使 session 持久化
        session.clear()  # 清除旧的 session 数据
        
        # 存储验证码和手机号到 session
        session['verification_code'] = code
        session['verification_phone'] = phone
        
        # 强制保存 session
        session.modified = True
        
        # 记录日志
        current_app.logger.debug(f'发送验证码: phone={phone}, code={code}')
        current_app.logger.debug(f'存储后的session内容: {dict(session)}')
        
        return jsonify({
            'success': True,
            'message': '验证码已发送',
            'code': code  # 仅在测试环境返回
        })
        
    except Exception as e:
        current_app.logger.error(f"发送验证码错误: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

@auth_bp.route('/verify-sms', methods=['POST'])
def verify_sms():
    try:
        data = request.get_json()
        phone = data.get('phone')
        code = data.get('code')
        
        # 详细的日志记录
        current_app.logger.debug(f'验证请求: phone={phone}, code={code}')
        current_app.logger.debug(f'当前session内容: {dict(session)}')
        
        stored_code = session.get('verification_code')
        stored_phone = session.get('verification_phone')
        
        current_app.logger.debug(f'存储的验证码: {stored_code}')
        current_app.logger.debug(f'存储的手机号: {stored_phone}')
        
        if not stored_code or not stored_phone:
            return jsonify({
                'success': False,
                'message': '验证码已过期或不存在',
                'debug': {
                    'stored_code': stored_code,
                    'stored_phone': stored_phone,
                    'session_content': dict(session)
                }
            }), 400
            
        if stored_phone != phone:
            return jsonify({
                'success': False,
                'message': '手机号不匹配',
                'debug': {
                    'stored_phone': stored_phone,
                    'submitted_phone': phone
                }
            }), 400
            
        if stored_code != code:
            return jsonify({
                'success': False,
                'message': '验证码错误',
                'debug': {
                    'stored_code': stored_code,
                    'submitted_code': code
                }
            }), 400
        
        # 验证成功后清除验证码
        session.pop('verification_code', None)
        session.pop('verification_phone', None)
        
        return jsonify({
            'success': True,
            'message': '验证成功'
        })
        
    except Exception as e:
        current_app.logger.error(f"验证码验证错误: {str(e)}")
        return jsonify({'success': False, 'message': str(e)}), 500

# 添加一个调试端点
@auth_bp.route('/check-session', methods=['GET'])
def check_session():
    """用于调试 session 的端点"""
    return jsonify({
        'session_content': dict(session),
        'verification_code': session.get('verification_code'),
        'verification_phone': session.get('verification_phone')
    })