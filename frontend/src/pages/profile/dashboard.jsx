import { useState, useEffect } from "react";
import "./dashboard.css";
import { getProfile, saveProfile,uploadLogo,uploadHero,uploadProductImage,createProduct,getProducts,deleteProduct,updateProduct,createReview,getReviews, updateReview,deleteReview, } from "../../api/api";

function Dashboard() {
  const [profile, setProfile] = useState({
  store_name: "",
  logo_type: "text",
  logo: "",
  hero_image: "",

  facebook: "",
  instagram: "",
  tiktok: "",
  twitter: "",

  email: "",
  phone: "",
  address: "",
  whatsapp: "",

  ceo_name: "",
  tagline: "",
  description: "",
});



const [product, setProduct] = useState({
  name: "",
  original_price: "",
  discount:"",
  description: "",
  image: "",
});


const [review, setReview] = useState({
  customer_name: "",
  comment: "",
  rating: 5,
});

const [reviews, setReviews] = useState([]);
const [showReviewForm, setShowReviewForm] = useState(false);
const [editingReviewId, setEditingReviewId] = useState(null);
const [products, setProducts] = useState([]);
const [showProductForm, setShowProductForm] = useState(false);
const [editingProductId, setEditingProductId] = useState(null);

useEffect(() => {
  loadProfile();
  loadProducts();
   loadReviews();
}, []);

async function loadProfile() {
  try {
    const data = await getProfile();

    if (data) {
      setProfile((prev) => ({
        ...prev,
        ...data,
      }));
    }
  } catch (error) {
    console.log("No profile found yet.");
  }
}





async function loadProducts() {
  try {
    const data = await getProducts();

    console.log("Products:", data);

    setProducts(data);
  } catch (error) {
    console.error(error);
  }
}


async function loadReviews() {
  try {
    const data = await getReviews();
    setReviews(data);
  } catch (error) {
    console.error(error);
  }
}




async function handleSave() {
  try {
    await saveProfile(profile);
    alert("Profile saved successfully!");
  } catch (error) {
    console.error(error);
    alert("Failed to save profile.");
  }
}




async function handleLogoUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const result = await uploadLogo(file);

    setProfile((prev) => ({
      ...prev,
      logo: result.filename,
      logo_type: "image",
    }));

    alert("Logo uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Logo upload failed.");
  }
}





async function handleHeroUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const result = await uploadHero(file);

    setProfile((prev) => ({
      ...prev,
      hero_image: result.filename,
    }));

    alert("Hero image uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Hero image upload failed.");
  }
}






async function handleProductImageUpload(e) {
  const file = e.target.files[0];

  if (!file) return;

  try {
    const result = await uploadProductImage(file);

    setProduct((prev) => ({
      ...prev,
      image: result.filename,
    }));

    alert("Product image uploaded successfully!");
  } catch (error) {
    console.error(error);
    alert("Product image upload failed.");
  }
}





async function handleSaveProduct() {
  try {
    const sellingPrice =
      product.original_price -
      (product.original_price * product.discount) / 100;

    const productData = {
      name: product.name,
      original_price: Number(product.original_price),
      discount: Number(product.discount),
      price: sellingPrice,
      description: product.description,
      image: product.image,
    };

    if (editingProductId) {
      await updateProduct(editingProductId, productData);
      alert("Product updated successfully!");
    } else {
      await createProduct(productData);
      alert("Product created successfully!");
    }

    setProduct({
      name: "",
      original_price: "",
      discount: "",
      description: "",
      image: "",
    });

    setEditingProductId(null);
    setShowProductForm(false);

    loadProducts();
  } catch (error) {
    console.error(error);
    alert("Operation failed.");
  }
}


async function handleDeleteProduct(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this product?"
  );

  if (!confirmDelete) return;

  try {
    await deleteProduct(id);

    alert("Product deleted successfully!");

    loadProducts();
  } catch (error) {
    console.error(error);
    alert("Failed to delete product.");
  }
}

async function handleSaveReview() {
  try {
    if (editingReviewId) {
      await updateReview(editingReviewId, review);
      alert("Review updated successfully!");
    } else {
      await createReview(review);
      alert("Review created successfully!");
    }

    setReview({
      customer_name: "",
      comment: "",
      rating: 5,
    });

    setEditingReviewId(null);
    setShowReviewForm(false);

    loadReviews();
  } catch (error) {
    console.error(error);
    alert("Operation failed.");
  }
}


function handleEditReview(item) {
  setReview(item);
  setEditingReviewId(item.id);
  setShowReviewForm(true);
}


async function handleDeleteReview(id) {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this review?"
  );

  if (!confirmDelete) return;

  try {
    await deleteReview(id);

    alert("Review deleted successfully!");

    loadReviews();
  } catch (error) {
    console.error(error);
    alert("Failed to delete review.");
  }
}


{/* calculate price for product */}
const calculatePrice = () => {
  if (!product.original_price) return 0;

  return Math.round(
    product.original_price -
      (product.original_price * product.discount) / 100
  );
};

return (
    <div className="profile-page">
      <div className="profile-container">

        {/* Header */}

        <div className="profile-header">
          <div>
            <h1>Profile</h1>
            <p>Manage your website information and settings.</p>
          </div>

          <div className="button-group">
            <button className="cancel-btn">Cancel</button>
            <button
              className="save-btn"
              onClick={handleSave}
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Top Cards */}

        <div className="top-grid">

          {/* Logo */}

          <div className="settings-card">

            <h2>Logo & Brand</h2>

            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="logo"
                  value="text"
                  checked={profile.logo_type === "text"}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      logo_type: e.target.value,
                    })
                  }
                />
                
                Text Logo
              </label>

              <label>
                <input
                    type="radio"
                    name="logo"
                    value="image"
                    checked={profile.logo_type === "image"}
                    onChange={(e) =>
                      setProfile({
                        ...profile,
                        logo_type: e.target.value,
                      })
                    }
                  />
                Image 
              </label>
              
              <label>
                      <input
                        type="radio"
                        name="logo_type"
                        value="both"
                        checked={profile.logo_type === "both"}
                        onChange={(e) =>
                          setProfile({
                            ...profile,
                            logo_type: e.target.value,
                          })
                        }
                      />
                      Both
                    </label>
            </div>

            <label>Store Name</label>

            <input
              type="text"
              className="profile-input"
              value={profile.store_name}
              onChange={(e) =>
                setProfile({
                  ...profile,
                  store_name: e.target.value,
                })
              }
            />

            <label>Current Logo</label>

            <div className="logo-preview">
                {profile.logo ? (
                  <img
                    src={`http://127.0.0.1:8000/uploads/${profile.logo}`}
                    alt="Logo"
                    className="preview-image"
                  />
                ) : (
                  "Logo Preview"
                )}
              </div>

            <label>Upload New Logo</label>

            <input
              type="file"
              className="profile-input"
              accept="image/*"
              onChange={handleLogoUpload}
            />

          </div>

          {/* Hero */}
<div className="settings-card">

  <h2>Hero Image</h2>

  <label>Current Hero</label>

  <div className="image-preview">
    {profile.hero_image ? (
      <img
        src={`http://127.0.0.1:8000/uploads/${profile.hero_image}`}
        alt="Hero"
        className="preview-image"
      />
    ) : (
      "Hero Image Preview"
    )}
  </div>

  <label>Upload Hero Image</label>

  <input
    type="file"
    className="profile-input"
    accept="image/*"
    onChange={handleHeroUpload}
  />

</div>

{/* Hero Content */}
<div className="settings-card">

  <h2>Hero Content</h2>

  <label>CEO Name</label>
  <input
    className="profile-input"
    placeholder="John Doe"
    value={profile.ceo_name}
    onChange={(e) =>
      setProfile({
        ...profile,
        ceo_name: e.target.value,
      })
    }
  />

  <label>Tagline</label>
  <input
    className="profile-input"
    placeholder="Lighting Your World"
    value={profile.tagline}
    onChange={(e) =>
      setProfile({
        ...profile,
        tagline: e.target.value,
      })
    }
  />

  <label>Short Description</label>
  <textarea
    className="profile-textarea"
    placeholder="Write a short description about your business..."
    value={profile.description}
    onChange={(e) =>
      setProfile({
        ...profile,
        description: e.target.value,
      })
    }
  />

</div>
</div>

        {/* Social & Contact */}
<div className="settings-card social-card">

  <h2>Social & Contact</h2>

  <div className="social-grid">

    {/* Facebook */}
    <div>
      <label>Facebook</label>
      <input
        className="profile-input"
        placeholder="https://facebook.com/..."
        value={profile.facebook || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            facebook: e.target.value,
          })
        }
      />
    </div>

    {/* Instagram */}
    <div>
      <label>Instagram</label>
      <input
        className="profile-input"
        placeholder="https://instagram.com/..."
        value={profile.instagram || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            instagram: e.target.value,
          })
        }
      />
    </div>

    {/* TikTok */}
    <div>
      <label>TikTok</label>
      <input
        className="profile-input"
        placeholder="https://tiktok.com/..."
        value={profile.tiktok || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            tiktok: e.target.value,
          })
        }
      />
    </div>

    {/* X (Twitter) */}
    <div>
      <label>X (Twitter)</label>
      <input
        className="profile-input"
        placeholder="https://x.com/..."
        value={profile.twitter || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            twitter: e.target.value,
          })
        }
      />
    </div>

    {/* WhatsApp */}
    <div>
      <label>WhatsApp Number</label>
      <input
        className="profile-input"
        placeholder="2348012345678"
        value={profile.whatsapp || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            whatsapp: e.target.value,
          })
        }
      />
    </div>

    {/* Email */}
    <div>
      <label>Email Address</label>
      <input
        type="email"
        className="profile-input"
        placeholder="example@gmail.com"
        value={profile.email || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            email: e.target.value,
          })
        }
      />
    </div>

    {/* Phone */}
    <div>
      <label>Phone Number</label>
      <input
        type="tel"
        className="profile-input"
        placeholder="+234 801 234 5678"
        value={profile.phone || ""}
        onChange={(e) =>
          setProfile({
            ...profile,
            phone: e.target.value,
          })
        }
      />
    </div>

  </div>

</div>
    



       {/* ================= Contact & Connect footer  ================= */}

<div className="settings-card">

  <h2>Footer Settings</h2>

  <label>Store Address</label>

  <input
    className="profile-input"
    placeholder="Store Address"
    value={profile.address}
    onChange={(e) =>
      setProfile({
        ...profile,
        address: e.target.value,
      })
    }
  />

</div>


        

        {/* ================= Products ================= */}

<div className="settings-card products-card">

  <div className="products-header">

    <div>
      <h2>Store Products</h2>
      <p>Add, edit and manage the products displayed in your store.</p>
    </div>

    <button
          className="add-product-btn"
          onClick={() => setShowProductForm(true)}
        >
          + Add Product
        </button>

  </div>


  <p className="product-limit">
    Products: <strong>{products.length} / 10</strong>
  </p>



  <div className="product-grid">


    {/* Existing Products */}

    {products.map((item) => (

      <div className="product-card" key={item.id}>

        <div className="product-image">

          <img
            src={`http://127.0.0.1:8000/uploads/${item.image}`}
            alt={item.name}
            className="preview-image"
          />

        </div>

         <div className="product-info">
      <h3>{item.name}</h3>

      <p className="old-price">
          ₦{Number(item.original_price).toLocaleString()}
        </p>

        <p className="new-price">
          ₦{Number(item.price).toLocaleString()}
        </p>

        <p className="discount">
          {item.discount}% OFF
        </p>

      <p className="product-description">
        {item.description}
      </p>
    </div>

            <div className="product-actions">

          <button
            className="edit-btn"
            onClick={() => {
              setProduct({
                name: item.name,
                original_price: item.original_price,
                discount: item.discount,
                description: item.description,
                image: item.image,
              });

              setEditingProductId(item.id);
              setShowProductForm(true);
            }}
          >
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => handleDeleteProduct(item.id)}
          >
            Delete
          </button>
            </div>

  </div>
))}


        



    {/* Add New Product Form */}

{showProductForm && (

    <div className="empty-product">

      <h3>
        {editingProductId ? "Edit Product" : "Add Product"}
      </h3>

      <div className="product-image">

        {product.image ? (

          <img
            src={`http://127.0.0.1:8000/uploads/${product.image}`}
            alt="Product"
            className="preview-image"
          />

        ) : (

          "Image Preview"

        )}

      </div>
      


      <input
            type="text"
            className="profile-input"
            placeholder="Product Name"
            value={product.name}
            onChange={(e) =>
              setProduct({
                ...product,
                name: e.target.value,
              })
            }
          />

      <input
            type="number"
            className="profile-input"
            placeholder="Original Price"
            value={product.original_price}
            onChange={(e) =>
              setProduct({
                ...product,
                original_price: e.target.value,
              })
            }
          />

          <input
            type="number"
            className="profile-input"
            placeholder="Discount (%)"
            value={product.discount}
            onChange={(e) =>
              setProduct({
                ...product,
                discount: e.target.value,
              })
            }
          />

          <p
              style={{
                fontWeight: "bold",
                color: "#d60000",
                marginTop: "10px",
              }}
            >
              Selling Price: ₦{calculatePrice().toLocaleString()}
            </p>



      <textarea
        className="profile-textarea"
        placeholder="Product Description"
        value={product.description}
        onChange={(e) =>
          setProduct({
            ...product,
            description: e.target.value,
          })
        }
      />



      <input
        type="file"
        className="profile-input"
        accept="image/*"
        onChange={handleProductImageUpload}
      />



      <div className="product-buttons">


        <button
            className="cancel-btn"
            onClick={() => {
              setShowProductForm(false);

              setProduct({
                name: "",
                original_price: "",
                discount: "",
                description: "",
                image: "",
              });

              setEditingProductId(null);
            }}
          >
            Cancel
          </button>


        <button
  className="save-btn"
  onClick={handleSaveProduct}
>
  {editingProductId ? "Update Product" : "Save Product"}
</button>

      </div>

    </div>

)}

  </div>

</div>

{/* ================= Reviews ================= */}

<div className="reviews-card">

  <div className="products-header">

    <h2>Reviews: {reviews.length}</h2>

    <button
      className="save-btn"
      onClick={() => {
        setShowReviewForm(!showReviewForm);
        setEditingReviewId(null);

        setReview({
          customer_name: "",
          comment: "",
          rating: 5,
        });
      }}
    >
      {showReviewForm ? "Close" : "+ Add Review"}
    </button>

  </div>

  {showReviewForm && (

    <div className="review-form">

      <label>Customer Name</label>

      <input
        className="profile-input"
        value={review.customer_name}
        onChange={(e) =>
          setReview({
            ...review,
            customer_name: e.target.value,
          })
        }
      />

      <label>Review</label>

      <textarea
        className="profile-textarea"
        rows="4"
        value={review.comment}
        onChange={(e) =>
          setReview({
            ...review,
            comment: e.target.value,
          })
        }
      />

      <label>Rating</label>

      <select
        className="profile-input"
        value={review.rating}
        onChange={(e) =>
          setReview({
            ...review,
            rating: Number(e.target.value),
          })
        }
      >
        <option value="5">★★★★★ (5)</option>
        <option value="4">★★★★☆ (4)</option>
        <option value="3">★★★☆☆ (3)</option>
        <option value="2">★★☆☆☆ (2)</option>
        <option value="1">★☆☆☆☆ (1)</option>
      </select>

      <div className="product-buttons">

        <button
          className="save-btn"
          onClick={handleSaveReview}
        >
          {editingReviewId ? "Update Review" : "Save Review"}
        </button>

      </div>

    </div>

  )}

  <div className="review-list">

    {reviews.map((item) => (

      <div
        className="review-item"
        key={item.id}
      >

        <div className="review-info">

          <h3>{item.customer_name}</h3>

          <p>{item.comment}</p>

          <div className="review-stars">
            {"★".repeat(item.rating)}
            {"☆".repeat(5 - item.rating)}
          </div>

        </div>

        <div className="review-actions">

          <button
            className="save-btn"
            onClick={() => handleEditReview(item)}
          >
            Edit
          </button>

          <button
            className="cancel-btn"
            onClick={() => handleDeleteReview(item.id)}
          >
            Delete
          </button>

        </div>

      </div>

    ))}

  </div>

</div>

</div>
</div>

      
  );
}

export default Dashboard;