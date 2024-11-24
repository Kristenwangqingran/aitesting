from app import db
from datetime import datetime

class Recruitment(db.Model):
    __tablename__ = 'recruitments'
    
    id = db.Column(db.Integer, primary_key=True)
    job_title = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    job_type = db.Column(db.String(50))
    location = db.Column(db.String(100))
    salary = db.Column(db.String(100))
    is_remote = db.Column(db.Boolean, default=False)
    tags = db.Column(db.JSON)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'job_title': self.job_title,
            'position': self.position,
            'job_type': self.job_type,
            'location': self.location,
            'salary': self.salary,
            'is_remote': self.is_remote,
            'tags': self.tags,
            'created_at': self.created_at.isoformat() if self.created_at else None
        }

class JobSeeker(db.Model):
    __tablename__ = 'job_seekers'
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    position = db.Column(db.String(100), nullable=False)
    experience = db.Column(db.String(100))
    expected_salary = db.Column(db.String(100))
    location = db.Column(db.String(100))
    skills = db.Column(db.String(500))
    resume_url = db.Column(db.String(200))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'position': self.position,
            'experience': self.experience,
            'expected_salary': self.expected_salary,
            'location': self.location,
            'skills': self.skills,
            'resume_url': self.resume_url,
            'created_at': self.created_at.isoformat() if self.created_at else None
        } 