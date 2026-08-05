from pydantic import BaseModel


class ProductBase(BaseModel):
    name: str
    price: float
    description: str


class ProductCreate(ProductBase):
    image: str | None = None


class ProductResponse(ProductBase):
    id: int
    image: str | None = None

    class Config:
        from_attributes = True