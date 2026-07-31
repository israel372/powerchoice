import os
import shutil
from uuid import uuid4


UPLOAD_FOLDER = "app/uploads"


def save_image(file):
    extension = file.filename.split(".")[-1]

    filename = f"{uuid4()}.{extension}"

    filepath = os.path.join(UPLOAD_FOLDER, filename)

    with open(filepath, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    return filename