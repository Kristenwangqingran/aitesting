from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
import datetime

app = Flask(__name__)
CORS(app)
app.config['SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# 用户模型
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80))
    phone = db.Column(db.String(11), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def __repr__(self):
        return f'<User {self.nickname}>'

# 创建数据库表
with app.app_context():
    db.create_all()

# 登录接口
@app.route('/api/auth/login', methods=['POST'])
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
    }, app.config['SECRET_KEY'])
    
    return jsonify({
        'success': True,
        'token': token,
        'nickname': user.nickname
    })

# 注册接口
@app.route('/api/auth/register', methods=['POST'])
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

# 微信登录接口
@app.route('/api/auth/wechat/login', methods=['GET'])
def wechat_login():
    # 生成微信授权URL
    # TODO: 实现微信登录逻辑
    auth_url = "https://open.weixin.qq.com/connect/qrconnect?appid=YOUR_APPID..."
    
    return jsonify({
        'success': True,
        'auth_url': auth_url
    })

# 忘记密码接口
@app.route('/api/auth/forgot-password', methods=['POST'])
def forgot_password():
    data = request.get_json()
    phone = data.get('phone')
    
    # TODO: 发送重置密码短信或邮件
    
    return jsonify({
        'success': True,
        'message': '重置密码链接已发送'
    })

if __name__ == '__main__':
    app.run(debug=True) 