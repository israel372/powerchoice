from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware

from app.database import Base, engine
from app.routes import profile, product, review



app = FastAPI(
    title="PowerChoice API",
    version="1.0.0"
)

app.mount(
    "/uploads",
    StaticFiles(directory="app/uploads"),
    name="uploads"
)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create database tables
Base.metadata.create_all(bind=engine)


# Register API routes
app.include_router(profile.router)
app.include_router(product.router)
app.include_router(review.router)


@app.get("/")
def home():
    return {
        "status": "success",
        "message": "PowerChoice Backend Running"
    }