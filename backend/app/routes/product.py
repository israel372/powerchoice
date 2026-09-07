from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException

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
                original_price=product.original_price,
                discount=product.discount,
                price=product.price,
                description=product.description,
                image=product.image,
)

    db.add(new_product)
    db.commit()
    db.refresh(new_product)

    

    return new_product

@router.delete("/{product_id}")
def delete_product(product_id: int, db: Session = Depends(get_db)):
    product = db.query(Product).filter(Product.id == product_id).first()

    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    db.delete(product)
    db.commit()

    return {"message": "Product deleted successfully"}



@router.post("/upload")
def upload_product_image(file: UploadFile = File(...)):

    image = save_image(file, folder="products")

    return {
    "message": "Image uploaded successfully",
    "url": image["url"]
}



@router.put("/{product_id}", response_model=ProductResponse)
def update_product(
    product_id: int,
    product: ProductCreate,
    db: Session = Depends(get_db)
):
    db_product = db.query(Product).filter(Product.id == product_id).first()

    if not db_product:
        raise HTTPException(status_code=404, detail="Product not found")

    db_product.name = product.name
    db_product.original_price = product.original_price
    db_product.discount = product.discount
    db_product.price = product.price
    db_product.description = product.description
    db_product.image = product.image
    db.commit()
    db.refresh(db_product)

    return db_product

