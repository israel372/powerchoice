import { useState, useEffect } from "react";
import "./dashboard.css";
import { getProfile, saveProfile,uploadLogo,uploadHero,uploadProductImage,createProduct,getProducts, } from "../../api/api";

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
});

const [product, setProduct] = useState({
  name: "",
  price: "",
  description: "",
  image: "",
});
const [products, setProducts] = useState([]);

useEffect(() => {
  loadProfile();
  loadProducts();
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
    setProducts(data);
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
    await createProduct(product);

    alert("Product created successfully!");

    setProduct({
      name: "",
      price: "",
      description: "",
      image: "",
    });

    // reload products from database
    loadProducts();

  } catch (error) {
    console.error(error);
    alert("Failed to create product.");
  }
}
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
                Image Logo
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

        </div>

        {/* Social */}

        <div className="settings-card social-card">

          <h2>Social Media Links</h2>

          <div className="social-grid">

            <div>
              <label>Facebook</label>
              <input
                  className="profile-input"
                  placeholder="https://facebook.com/..."
                  value={profile.facebook}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      facebook: e.target.value,
                    })
                  }
                />
            </div>

            <div>
              <label>Instagram</label>
              <input
                  className="profile-input"
                  placeholder="https://instagram.com/..."
                  value={profile.instagram}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      instagram: e.target.value,
                    })
                  }
                />
            </div>

            <div>
              <label>TikTok</label>
              <input
                  className="profile-input"
                  placeholder="https://tiktok.com/..."
                  value={profile.tiktok}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      tiktok: e.target.value,
                    })
                  }
                />
            </div>

            <div>
              <label>X (Twitter)</label>
              <input
                  className="profile-input"
                  placeholder="https://x.com/..."
                  value={profile.twitter}
                  onChange={(e) =>
                    setProfile({
                      ...profile,
                      twitter: e.target.value,
                    })
                  }
                />
            </div>

          </div>

        </div>

        {/* ================= Products ================= */}

<div className="settings-card products-card">

  <div className="products-header">

    <div>
      <h2>Store Products</h2>
      <p>Add, edit and manage the products displayed in your store.</p>
    </div>

    <button className="add-product-btn">
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


        <h3>{item.name}</h3>

        <p>₦{item.price}</p>

        <p>{item.description}</p>


      </div>

    ))}




    {/* Add New Product Form */}

    <div className="empty-product">


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
        placeholder="Price"
        value={product.price}
        onChange={(e) =>
          setProduct({
            ...product,
            price: e.target.value,
          })
        }
      />



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


        <button className="cancel-btn">
          Delete
        </button>



        <button
          className="save-btn"
          onClick={handleSaveProduct}
        >
          Save Product
        </button>


      </div>


    </div>



  </div>


</div>

      </div>
    </div>
  );
}

export default Dashboard;