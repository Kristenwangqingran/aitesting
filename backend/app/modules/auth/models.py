from app.extensions import db

class User(db.Model):
    __tablename__ = 'user'
    
    id = db.Column(db.Integer, primary_key=True)
    nickname = db.Column(db.String(80), nullable=False)
    phone = db.Column(db.String(11), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def __repr__(self):
        return f'<User {self.nickname}>' 