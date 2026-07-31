from sqlalchemy import Column, Integer, String

from app.database import Base


class Profile(Base):
    __tablename__ = "profiles"

    id = Column(Integer, primary_key=True, index=True)

    store_name = Column(String)

    logo_type = Column(String)

    logo = Column(String)

    hero_image = Column(String)

    facebook = Column(String)

    instagram = Column(String)

    tiktok = Column(String)

    twitter = Column(String)