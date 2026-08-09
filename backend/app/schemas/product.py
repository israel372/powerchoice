from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    original_price: float
    discount: float = 0
    price: float
    description: str


class ProductCreate(ProductBase):
    image: str | None = None


class ProductResponse(ProductBase):
    id: int
    image: str | None = None

    class Config:
        from_attributes = True