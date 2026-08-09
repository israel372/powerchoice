from sqlalchemy import Column
from sqlalchemy import Integer
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import Text

from app.database import Base


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String)

    original_price = Column(Float)

    discount = Column(Float, default=0)

    price = Column(Float)

    description = Column(Text)

    image = Column(String, nullable=True)
    