import re

def validate_phone(phone):
    # 这里使用一个简单的正则表达式来验证中国大陆手机号
    pattern = r'^1[3-9]\d{9}$'
    return re.match(pattern, phone) is not None