const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";


// ======================================================
// Backend Status
// ======================================================

export async function getBackendStatus() {
  const response = await fetch(`${API_BASE}/`);

  if (!response.ok) {
    throw new Error("Backend connection failed");
  }

  return response.json();
}


// ======================================================
// Get Store Profile
// ======================================================

export async function getProfile() {
  const response = await fetch(`${API_BASE}/profile/`);

  if (!response.ok) {
    throw new Error("Failed to load profile");
  }

  return response.json();
}


// ======================================================
// Save Store Profile
// ======================================================

export async function saveProfile(profileData) {
  const response = await fetch(`${API_BASE}/profile/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(profileData),
  });

  if (!response.ok) {
    throw new Error("Failed to save profile");
  }

  return response.json();
}


// ======================================================
// Upload Logo
// ======================================================

export async function uploadLogo(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/profile/logo`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload logo");
  }

  return response.json();
}


// ======================================================
// Upload Hero Image
// ======================================================

export async function uploadHero(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/profile/hero`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload hero image");
  }

  return response.json();
}


// ======================================================
// Upload Product Image
// ======================================================

export async function uploadProductImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE}/products/upload`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Failed to upload product image");
  }

  return response.json();
}


// ======================================================
// Create Product
// ======================================================

export async function createProduct(product) {
  const response = await fetch(`${API_BASE}/products/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to create product");
  }

  return response.json();
}


// ======================================================
// Get Products
// ======================================================

export async function getProducts() {
  const response = await fetch(`${API_BASE}/products/`);

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  return response.json();
}


// ======================================================
// Delete Product
// ======================================================

export async function deleteProduct(id) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete product");
  }

  return response.json();
}


// ======================================================
// Update Product
// ======================================================

export async function updateProduct(id, product) {
  const response = await fetch(`${API_BASE}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(product),
  });

  if (!response.ok) {
    throw new Error("Failed to update product");
  }

  return response.json();
}


// ======================================================
// Get Reviews
// ======================================================

export async function getReviews() {
  const response = await fetch(`${API_BASE}/reviews/`);

  if (!response.ok) {
    throw new Error("Failed to load reviews");
  }

  return response.json();
}


// ======================================================
// Create Review
// ======================================================

export async function createReview(review) {
  const response = await fetch(`${API_BASE}/reviews/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error("Failed to create review");
  }

  return response.json();
}


// ======================================================
// Update Review
// ======================================================

export async function updateReview(id, review) {
  const response = await fetch(`${API_BASE}/reviews/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(review),
  });

  if (!response.ok) {
    throw new Error("Failed to update review");
  }

  return response.json();
}


// ======================================================
// Delete Review
// ======================================================

export async function deleteReview(id) {
  const response = await fetch(`${API_BASE}/reviews/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete review");
  }

  return response.json();
}


// ======================================================
// Export API Base URL
// ======================================================

export const API = API_BASE;


// ======================================================
// Image / Upload URL Helper
// ======================================================

export function getUploadUrl(image) {
  if (
    image === null ||
    image === undefined ||
    image === "" ||
    image === "null" ||
    image === "undefined"
  ) {
    return "";
  }

  const imageUrl = String(image).trim();

  // Supabase / external image
  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  // Old/local uploaded image
  return `${API_BASE}/uploads/${encodeURIComponent(imageUrl)}`;
}