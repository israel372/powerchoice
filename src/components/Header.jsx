import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { getProfile, getUploadUrl } from "../api/api";
import "./header.css";


function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profile, setProfile] = useState({});

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error(error);
    }
  }

  console.log("Header profile:", profile);

  return (
    <header>
      <div className="container">
        <nav>

          {/* Logo Area */}
          <div className="logo-area">

            {/* IMAGE ONLY */}
            {profile.logo_type === "image" && profile.logo && (
              <img
                src={getUploadUrl(profile.logo)}
                alt={profile.store_name || "Logo"}
                className="header-logo"
              />
            )}

            {/* TEXT ONLY */}
            {profile.logo_type === "text" && (
              <h1>{profile.store_name}</h1>
            )}

            {/* BOTH */}
            {profile.logo_type === "both" && (
              <>
                {profile.logo && (
                  <img
                    src={getUploadUrl(profile.logo)}
                    alt={profile.store_name || "Logo"}
                    className="header-logo"
                  />
                )}

                <h1>{profile.store_name}</h1>
              </>
            )}

          </div>


          {/* Desktop Menu */}
          <ul className="nav-links">
            <li>
              <a href="#">Home</a>
            </li>

            <li>
              <a href="#">Product</a>
            </li>
          </ul>


          {/* Mobile Menu Button */}
          <button
            className="menu-btn"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FaTimes /> : <FaBars />}
          </button>

        </nav>


        {/* Mobile Menu */}
        {menuOpen && (
          <div className="mobile-menu">

            <a href="#">Home</a>

            <a href="#">Product</a>

          </div>
        )}

      </div>
    </header>
  );
}

export default Header;
