from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.product import Product
from app.schemas.product import ProductCreate, ProductResponse
from fastapi import UploadFile, File
from app.services.upload_service import save_image



router = APIRouter(
    prefix="/products",
    tags=["Products"]
)

@router.get("/", response_model=list[ProductResponse])
def get_products(db: Session = Depends(get_db)):
    return db.query(Product).all()

@router.post("/", response_model=ProductResponse)
def create_product(
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    new_product = Product(
        name=product.name,
        price=product.price,
        description=product.description,
    )

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    return new_product

@router.post("/upload")
def upload_product_image(file: UploadFile = File(...)):
    filename = save_image(file)

    return {
        "message": "Image uploaded successfully",
        "filename": filename,
        "url": f"/uploads/{filename}"
    }

