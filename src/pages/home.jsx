import { useState, useEffect } from "react";
import { getBackendStatus, getProducts, getProfile, getReviews, getUploadUrl, API } from "../api/api";
import Header from "../components/Header";
import "./home.css";
import Footer from "../components/footer";
import { QRCodeCanvas } from "qrcode.react";

import storeImage from "../assets/store.jpg";
import wineImage from "../assets/wine.jpg";

import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";


function Home() {

  const [message, setMessage] = useState("");
  const [products, setProducts] = useState([]);
  const [profile, setProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [showCard, setShowCard] = useState(false);



  useEffect(() => {
  loadProducts();
  loadProfile();
  loadReviews();

}, []);

async function loadProducts() {
  try {
    const data = await getProducts();
    setProducts(data);
  } catch (error) {
    console.error(error);
  }
}

async function loadProfile() {
  try {
    const data = await getProfile();
    setProfile(data);
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
  const testBackend = async () => {
    try {
      const data = await getBackendStatus();
      setMessage(data.message);
    } catch (error) {
      setMessage("Cannot connect to backend.");
    }
  };

  const scrollCart = (direction) => {
    const cart = document.getElementById("product-cart");

    if (!cart) return;

    if (direction === "left") {
      cart.scrollBy({ left: -300, behavior: "smooth" });
    } else {
      cart.scrollBy({ left: 300, behavior: "smooth" });
    }
  };


  return (
    <>
      <Header />

      <main className="home">

  <div className="home-container">

<div className="hero-section">

  <img
    src={
      profile.hero_image
        ? getUploadUrl(profile.hero_image)
        : storeImage
    }
    alt="Store"
    className="store-image"
  />

  {/* Text Overlay */}
  <div className="hero-overlay">
    <h1>{profile.store_name}</h1>

    <h3>CEO: {profile.ceo_name}</h3>

    <h2>{profile.tagline}</h2>

    <p>{profile.description}</p>
  </div>

  {/* QR Code */}
  <div
    className="hero-qrcode"
    onClick={() => setShowCard(true)}
  >
    <QRCodeCanvas
      value={`${API}/profile/contact`}
      size={130}
    />
  




</div>
{/* Popup Modal */}
{showCard && (
  <div
    className="modal-overlay"
    onClick={() => setShowCard(false)}
  >
    <div
      className="modal-card"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Store Name */}
      <h2 className="store-card-header">
        {profile.store_name}
      </h2>

      {/* Main Content */}
      <div className="store-card-body">

        {/* Left Image */}
        <div className="store-card-left">
          <div className="image-wrapper">
            <img
              src={
                profile.hero_image
                  ?getUploadUrl(profile.hero_image) 
                  : storeImage
              }
              alt={profile.store_name}
            />
          </div>
        </div>

        {/* QR Code */}
        <div className="store-card-right">
          <div className="qr-wrapper">
            <QRCodeCanvas
              value={`${API}/profile/contact`}
              size={180}
            />
          </div>
        </div>

      </div>

      {/* Bottom Contact */}
      <div className="store-contact-bottom">

        <div className="bottom-item">
          <span className="contact-icon">📧</span>
          <span>{profile.email || "No email"}</span>
        </div>

        <div className="bottom-item">
          <span className="contact-icon">📞</span>
          <span>{profile.phone || "No phone number"}</span>
        </div>

        <div className="bottom-item">
          <span className="contact-icon">📍</span>
          <span>{profile.address || "No address"}</span>
        </div>

      </div>

    </div>
  </div>
)}
    </div>
     


       {/* Facebook */}
{profile.facebook?.trim() && (
  <a
    href={profile.facebook}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card facebook"
  >
    <span className="social-left">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/0/05/Facebook_Logo_(2019).png"
        alt="Facebook"
        width={28}
        height={28}
      />
      Facebook
    </span>

    <span>➔</span>
  </a>
)}

{/* TikTok */}
{profile.tiktok?.trim() && (
  <a
    href={profile.tiktok}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card tiktok"
  >
    <span className="social-left">
      <FaTiktok size={28} />
      TikTok
    </span>

    <span>➔</span>
  </a>
)}

{/* Instagram */}
{profile.instagram?.trim() && (
  <a
    href={profile.instagram}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card instagram"
  >
    <span className="social-left">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
        alt="Instagram"
        width={28}
        height={28}
      />
      Instagram
    </span>

    <span>➔</span>
  </a>
)}

{/* X (Twitter) */}
{profile.twitter?.trim() && (
  <a
    href={profile.twitter}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card twitter"
  >
    <span className="social-left">
      <FaXTwitter size={28} />
      Twitter
    </span>

    <span>➔</span>
  </a>
)}

{/* WhatsApp */}
{profile.whatsapp?.trim() && (
  <a
    href={`https://wa.me/${profile.whatsapp}`}
    target="_blank"
    rel="noopener noreferrer"
    className="social-card whatsapp"
  >
    <span className="social-left">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg"
        alt="WhatsApp"
        width={28}
        height={28}
      />
      WhatsApp
    </span>

    <span>➔</span>
  </a>
)}

{/* Email */}
{profile.email?.trim() && (
  <a
    href={`mailto:${profile.email}`}
    className="social-card email"
  >
    <span className="social-left">
      📧 Email
    </span>

    <span>➔</span>
  </a>
)}

{/* Phone */}
{profile.phone?.trim() && (
  <a
    href={`tel:${profile.phone}`}
    className="social-card phone"
  >
    <span className="social-left">
      📞 Call Us
    </span>

    <span>➔</span>
  </a>
)}
        {/* Product Carousel */}
        <div className="cart-wrapper">

          <button
            className="arrow-btn left"
            onClick={() => scrollCart("left")}
          >
            <FaArrowLeft />
          </button>

          <div id="product-cart" className="product-cart">
            {products.map((product) => (
              <a
                key={product.id}
                href={`https://wa.me/2348012345678?text=${encodeURIComponent(
                  `Hi, I am interested in ${product.name}`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card"
              >
                <img
                    src={getUploadUrl(product.image)}
                    alt={product.name}
                    className="product-image"
                  />

                <h4 className="product-name">
                  {product.name}
                </h4>

                <div className="product-pricing">

                  <p className="old-price">
                    ₦{Number(product.original_price).toLocaleString()}
                  </p>

                  <p className="new-price">
                    ₦{Number(product.price).toLocaleString()}
                  </p>

                  {product.discount > 0 && (
                    <span className="discount-badge">
                      {product.discount}% OFF
                    </span>
                  )}

                </div>
              </a>
            ))}
          </div>

          <button
            className="arrow-btn right"
            onClick={() => scrollCart("right")}
          >
            <FaArrowRight />
          </button>

        </div>
        </div>

        {/*
        <section className="reviews-section">

  <h2 className="reviews-title">
    Customer Reviews
  </h2>

  <div className="reviews-grid">

    {reviews.map((item) => (

      <div
        key={item.id}
        className="review-card"
      >

        <div className="review-stars">
          {"⭐".repeat(item.rating)}
        </div>

        <p className="review-text">
          "{item.comment}"
        </p>

        <h4 className="review-name">
          {item.customer_name}
        </h4>

      </div>

    ))}

  </div>

</section>
*/}

      </main>
      <Footer profile={profile} />

    </>
  );
}

export default Home;

