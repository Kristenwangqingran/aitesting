from functools import wraps
from flask import request, jsonify, current_app
import jwt

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        if not token:
            return jsonify({'message': '没有提供token'}), 401
            
        try:
            token = token.split(' ')[1]  # Bearer token
            data = jwt.decode(token, current_app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user_id = data['user_id']
        except:
            return jsonify({'message': 'token无效或已过期'}), 401
            
        return f(*args, **kwargs)
        
    return decorated 