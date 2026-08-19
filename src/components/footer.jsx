import "./footer.css";
import { API, getUploadUrl } from "../api/api";

function Footer({ profile }) {
  return (
    <footer className="footer">
      <div className="footer-container">

        {/* ===== Brand Section ===== */}
        <div className="footer-brand">
          {profile?.logo_type === "image" && profile?.logo && (
            <img
              src={getUploadUrl(profile.logo)}
              alt="Logo"
              className="footer-logo"
            />
          )}

          {profile?.logo_type === "text" && (
            <h2 className="footer-title">{profile.store_name}</h2>
          )}

          {profile?.logo_type === "both" && (
            <>
              {profile.logo && (
                <img
                  src={getUploadUrl(profile.logo)}
                  alt="Logo"
                  className="footer-logo"
                />
              )}
              <h2 className="footer-title">{profile.store_name}</h2>
            </>
          )}
        </div>

        {/* ===== Store Address ===== */}
        <div className="footer-address">
          <h3>Store Address</h3>
          <p>{profile?.address || "No address added yet"}</p>
        </div>

        {/* ===== Footer Bottom ===== */}
        <div className="footer-bottom">
          <p className="footer-location">Located at Aliyah Mall</p>
          <p className="footer-copy">
            © {new Date().getFullYear()} Creator-Yard. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
