from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    price: float
    description: str


class ProductCreate(ProductBase):
    pass


class ProductResponse(ProductBase):
    id: int
    image: str | None = None

    class Config:
        from_attributes = True