from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.profile import Profile
from app.schemas.profile import ProfileCreate, ProfileResponse
from fastapi import UploadFile, File
from app.services.upload_service import save_image
from fastapi.responses import Response
from fastapi import HTTPException


router = APIRouter(
    prefix="/profile",
    tags=["Profile"]
)


@router.get("/", response_model=ProfileResponse)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(Profile).first()

    if not profile:
        profile = Profile(
            store_name="",
            logo_type="text",
            logo="",
            hero_image="",
            facebook="",
            instagram="",
            tiktok="",
            twitter="",
            email="",
            phone="",
            address="",
            whatsapp=""
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return profile

@router.post("/", response_model=ProfileResponse)
def save_profile(
    profile: ProfileCreate,
    db: Session = Depends(get_db)
):

    

    # Check if a profile already exists
    existing_profile = db.query(Profile).first()

    if existing_profile:
        # Update existing profile
        existing_profile.store_name = profile.store_name
        existing_profile.logo_type = profile.logo_type

        existing_profile.facebook = profile.facebook
        existing_profile.instagram = profile.instagram
        existing_profile.tiktok = profile.tiktok
        existing_profile.twitter = profile.twitter

        existing_profile.email = profile.email
        existing_profile.phone = profile.phone
        existing_profile.address = profile.address
        existing_profile.whatsapp = profile.whatsapp

        existing_profile.ceo_name = profile.ceo_name
        existing_profile.tagline = profile.tagline
        existing_profile.description = profile.description

        db.commit()
        db.refresh(existing_profile)

        return existing_profile

    # Create new profile
    new_profile = Profile(
        store_name=profile.store_name,
        logo_type=profile.logo_type,

        facebook=profile.facebook,
        instagram=profile.instagram,
        tiktok=profile.tiktok,
        twitter=profile.twitter,
        email=profile.email,
        phone=profile.phone,
        address=profile.address,
        whatsapp=profile.whatsapp,

        ceo_name=profile.ceo_name,
        tagline=profile.tagline,
        description=profile.description,
    )

    db.add(new_profile)
    db.commit()
    db.refresh(new_profile)

    return new_profile


@router.post("/logo")
def upload_logo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save image inside app/uploads
    filename = save_image(file)

    # Find existing profile
    profile = db.query(Profile).first()

    if profile:
        profile.logo = filename
        db.commit()
        db.refresh(profile)
    else:
        profile = Profile(
            store_name="",
            logo_type="image",
            logo=filename,
            hero_image="",
            facebook="",
            instagram="",
            tiktok="",
            twitter="",
            email="",
            phone="",
            address="",
            whatsapp="",
            ceo_name="",
            tagline="",
            description="",
        )

        db.add(profile)
        db.commit()
        db.refresh(profile)

    return {
        "message": "Logo uploaded successfully",
        "filename": filename,
        "url": f"/uploads/{filename}"
    }


@router.post("/hero")
def upload_hero(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    filename = save_image(file)

    profile = db.query(Profile).first()

    if not profile:
        profile = Profile()
        db.add(profile)

    profile.hero_image = filename

    db.commit()

    return {
        "message": "Hero image uploaded successfully",
        "filename": filename,
        "url": f"/uploads/{filename}"
    }



@router.get("/contact")
def download_contact(db: Session = Depends(get_db)):

    profile = db.query(Profile).first()

    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")

    # Change this to your real website
    website = "http://127.0.0.1:5173"

    hero = ""

    if profile.hero_image:
        hero = f"http://127.0.0.1:8000/uploads/{profile.hero_image}"

    vcard = f"""BEGIN:VCARD
VERSION:3.0
FN:{profile.store_name}
ORG:{profile.store_name}
TITLE:{profile.ceo_name}
TEL;TYPE=CELL:{profile.phone}
EMAIL:{profile.email}
ADR:;;{profile.address}
URL:{website}
PHOTO;VALUE=URI:{hero}
NOTE:{profile.description}
END:VCARD
"""

    return Response(
        content=vcard,
        media_type="text/vcard",
        headers={
            "Content-Disposition": f'attachment; filename="{profile.store_name}.vcf"'
        },
    )