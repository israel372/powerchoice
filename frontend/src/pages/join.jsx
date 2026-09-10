
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import "./join.css";

const API_BASE =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

function Join() {
  const [searchParams] = useSearchParams();
  const code = searchParams.get("code");

  const [checking, setChecking] = useState(true);
  const [valid, setValid] = useState(false);

  const [domain, setDomain] = useState("");
    const [email, setEmail] = useState("");

    const [domainChecking, setDomainChecking] = useState(false);
    const [domainAvailable, setDomainAvailable] = useState(false);
    const [domainMessage, setDomainMessage] = useState("");
  useEffect(() => {
    if (!code) {
      setChecking(false);
      return;
    }

    fetch(
      `${API_BASE}/referral/check?code=${encodeURIComponent(code)}`
    )
      .then((response) => response.json())
      .then((data) => {
        setValid(data.valid);
        setChecking(false);
      })
      .catch(() => {
        setValid(false);
        setChecking(false);
      });
  }, [code]);



  useEffect(() => {
  const trimmedDomain = domain.trim().toLowerCase();

  setDomainAvailable(false);
  setDomainMessage("");

  if (!trimmedDomain) {
    setDomainChecking(false);
    return;
  }

  const timer = setTimeout(() => {
    setDomainChecking(true);

    fetch(
      `${API_BASE}/referral/check-domain?domain=${encodeURIComponent(
        trimmedDomain
      )}`
    )
      .then((response) => response.json())
      .then((data) => {
        setDomainAvailable(data.available === true);

        if (data.available === true) {
          setDomainMessage("✓ Domain is available");
        } else {
          setDomainMessage("✕ Domain is not available");
        }

        setDomainChecking(false);
      })
      .catch(() => {
        setDomainAvailable(false);
        setDomainMessage("Unable to check domain");
        setDomainChecking(false);
      });
  }, 500);

  return () => clearTimeout(timer);
}, [domain]);

  /* =========================
     CHECKING REFERRAL
  ========================= */

  if (checking) {
    return (
      <div className="join-page">
        <div className="join-loading">
          <div className="join-spinner"></div>
          <h3>Checking your referral</h3>
          <p>Please wait a moment...</p>
        </div>
      </div>
    );
  }

  /* =========================
     INVALID REFERRAL
  ========================= */

  if (!code || !valid) {
    return (
      <div className="join-page">
        <div className="join-invalid-card">
          <div className="join-warning-icon">!</div>

          <h1>Referral Required</h1>

          <p>
            Please use a valid PowerChoice referral link to
            continue with your website setup.
          </p>

          <div className="join-invalid-note">
            If you believe you received this message by mistake,
            please contact the person who referred you.
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     JOIN PAGE
  ========================= */

  return (
    <div className="join-page">
      <div className="join-wrapper">

        {/* Header */}
        <div className="join-header">
          

          <h1>
            Let's get your
            <span> business online.</span>
          </h1>

          <p>
            Tell us a few details and we'll help you get your
            PowerChoice website started.
          </p>
        </div>

        {/* Main Card */}
        <div className="join-card">

          {/* Referral */}
          <div className="join-referral">
            <div>
              <span className="join-referral-label">
                Referral Code
              </span>

              <strong>{code}</strong>
            </div>

            <span className="join-referral-check">✓</span>
          </div>

          <div className="join-divider"></div>

          {/* Form */}
          <div className="join-form">

            {/* Domain */}
            <div className="join-field">
              <label htmlFor="domain">
                Company  Name
              </label>

              <p className="join-field-description">
                What domain would you like to use for your website?
              </p>

              <div className="join-input-wrapper">
        

                <input
                  id="domain"
                  type="text"
                  placeholder="yourbusiness.com"
                  value={domain}
                  onChange={(event) =>
                    setDomain(event.target.value)
                  }
                />
              </div>

              {domain.trim() && (
            <div className="domain-status">
                {domainChecking
                ? "Checking domain..."
                : domainMessage}
            </div>
            )}
            </div>

            {/* Email */}
            <div className="join-field">
              <label htmlFor="email">
                Email address
              </label>

              <p className="join-field-description">
                We'll use this email to contact you about your website.
              </p>

              <div className="join-input-wrapper">

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                />
              </div>
            </div>


                        {/* Website Setup Fee */}
            <div className="join-field">
              <label>
                Website setup fee
              </label>

              <p className="join-field-description">
                The one-time payment for setting up your PowerChoice website is:
              </p>

              <strong className="join-price">
                ₦80,000
              </strong>
            </div>

            {/* Continue */}
            <button
              type="button"
              className="join-button"
              disabled={!domainAvailable || !email.trim()}
            >
              Continue
              <span>→</span>
            </button>

          </div>
        </div>

        {/* Footer */}
        <div className="join-footer">
          Your information is secure and will only be used
          to set up your PowerChoice website.
        </div>

      </div>
    </div>
  );
}

export default Join;

