import { useState } from "react";
import { getBackendStatus } from "../api/api";
import Header from "../components/Header";
import "./home.css";

import storeImage from "../assets/store.jpg";
import wineImage from "../assets/wine.jpg";

import { FaTiktok } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Home() {
  const [message, setMessage] = useState("");

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
    <img
      src={storeImage}
      alt="Shopping in PowerChoice store"
      className="store-image"
    />


        {/* Facebook */}
        <a
          href="https://facebook.com/YourProfileName"
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

        {/* TikTok */}
        <a
        
          href="https://tiktok.com/@YourProfileName"
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

        {/* Instagram */}
        <a
          href="https://instagram.com/YourProfileName"
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

        {/* X */}
        <a
          href="https://x.com/YourProfileName"
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
                  product.whatsappMessage
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="product-card"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="product-image"
                />

                <h4 className="product-name">{product.name}</h4>

                <p className="product-price">${product.price}</p>
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

      </main>
    </>
  );
}

export default Home;

const products = [
  {
    id: 1,
    name: "Red Wine Bottle",
    price: 25,
    imageUrl: wineImage,
    whatsappMessage: "Hi, I am interested in the Red Wine Bottle",
  },
  {
    id: 2,
    name: "White Wine Bottle",
    price: 30,
    imageUrl: wineImage,
    whatsappMessage: "Hi, I am interested in the White Wine Bottle",
  },
  {
    id: 3,
    name: "Rosé Wine Bottle",
    price: 40,
    imageUrl: wineImage,
    whatsappMessage: "Hi, I am interested in the Rosé Wine Bottle",
  },
];