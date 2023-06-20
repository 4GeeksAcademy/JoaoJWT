"""empty message

Revision ID: c6023ba1b7a4
Revises: 7cf28d5478aa
Create Date: 2023-06-20 00:50:47.180505

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c6023ba1b7a4'
down_revision = '7cf28d5478aa'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.drop_constraint('user_rut_key', type_='unique')
        batch_op.drop_column('dob')
        batch_op.drop_column('rut')

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('rut', sa.VARCHAR(length=10), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('dob', postgresql.TIMESTAMP(), autoincrement=False, nullable=True))
        batch_op.create_unique_constraint('user_rut_key', ['rut'])

    # ### end Alembic commands ###
