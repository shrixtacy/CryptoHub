import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

function Navbar() {
  const { currentUser, logout, isEmailProvider } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isDashboardPage = location.pathname === "/dashboard";

  /* -------------------- Handlers -------------------- */

  const handleDropdownEnter = (label) => {
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    setTimeout(() => setOpenDropdown(null), 100);
  };

  const handleDropdownClick = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
      closeMobileMenu();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [logout, navigate]);

  /* -------------------- Effects -------------------- */

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (openDropdown && !e.target.closest(".dropdown-container")) {
        setOpenDropdown(null);
      }
    };

    const handleEscape = (e) => {
      if (e.key === "Escape") setOpenDropdown(null);
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [openDropdown]);

  /* -------------------- Nav Links -------------------- */

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/pricing", label: "Pricing" },
    { to: "/blog", label: "Insights" },
    { to: "/features", label: "Features" },
    {
      label: "More",
      dropdown: [
        { to: "/contributors", label: "Contributors" },
        { to: "/contactus", label: "Contact Us" },
        { to: "/faq", label: "FAQ" },
      ],
    },
  ];

  const authenticatedNavLinks = [
    ...navLinks,
    { to: "/dashboard", label: "Dashboard" },
    { to: "/leaderboard", label: "Leaderboard" },
  ];

  const linksToRender = currentUser ? authenticatedNavLinks : navLinks;

  /* -------------------- JSX -------------------- */

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${
        isMobileMenuOpen ? "has-mobile-menu" : ""
      } ${isDashboardPage ? "is-dashboard" : ""}`}
    >
      <div className="navbar-content">
        {/* Logo */}
        <Link to="/" className="navbar-logo">
          <img src="/crypto-logo.png" alt="CryptoHub" className="logo-img" />
          <span className="logo-text">CryptoHub</span>
        </Link>

        {/* Desktop Menu */}
        {!isDashboardPage && (
          <ul className="navbar-menu">
            {linksToRender.map((link) => (
              <li
                key={link.label}
                className="navbar-item dropdown-container"
                onMouseEnter={() =>
                  link.dropdown && handleDropdownEnter(link.label)
                }
                onMouseLeave={handleDropdownLeave}
              >
                {!link.dropdown ? (
                  <Link
                    to={link.to}
                    className={`navbar-link ${
                      location.pathname === link.to ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <>
                    <span
                      className="navbar-link dropdown-trigger"
                      role="button"
                      tabIndex={0}
                      aria-haspopup="true"
                      aria-expanded={openDropdown === link.label}
                      onClick={() => handleDropdownClick(link.label)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleDropdownClick(link.label);
                        }
                      }}
                    >
                      {link.label}
                    </span>

                    <ul
                      className={`dropdown-menu ${
                        openDropdown === link.label ? "show" : ""
                      }`}
                      role="menu"
                    >
                      {link.dropdown.map((item) => (
                        <li key={item.to} role="none">
                          <Link
                            to={item.to}
                            className="dropdown-link"
                            role="menuitem"
                            onClick={closeMobileMenu}
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Right Actions */}
        <div className="navbar-actions">
          <div className="desktop-auth">
            {currentUser ? (
              <div className="user-menu">
                <span className="user-email">{currentUser.email}</span>
                {isEmailProvider() && (
                  <Link to="/change-password" className="icon-btn">
                    <FiLock />
                  </Link>
                )}
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link to="/login" className="navbar-btn navbar-btn-login">
                  LOGIN
                </Link>
                <Link to="/signup" className="navbar-btn navbar-btn-signup">
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <button
            className={`navbar-toggle ${
              isMobileMenuOpen ? "active" : ""
            }`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
