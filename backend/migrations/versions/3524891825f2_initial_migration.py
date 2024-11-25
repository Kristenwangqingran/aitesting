"""initial migration

Revision ID: 3524891825f2
Revises: 
Create Date: 2024-11-25 01:03:18.496427

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3524891825f2'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('job_seekers',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=100), nullable=False),
    sa.Column('position', sa.String(length=100), nullable=False),
    sa.Column('experience', sa.String(length=100), nullable=True),
    sa.Column('expected_salary', sa.String(length=100), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('skills', sa.String(length=500), nullable=True),
    sa.Column('resume_url', sa.String(length=200), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('recruitments',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('job_title', sa.String(length=100), nullable=False),
    sa.Column('position', sa.String(length=100), nullable=False),
    sa.Column('job_type', sa.String(length=50), nullable=True),
    sa.Column('location', sa.String(length=100), nullable=True),
    sa.Column('salary', sa.String(length=100), nullable=True),
    sa.Column('is_remote', sa.Boolean(), nullable=True),
    sa.Column('tags', sa.JSON(), nullable=True),
    sa.Column('created_at', sa.DateTime(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('recruitments')
    op.drop_table('job_seekers')
    # ### end Alembic commands ###
