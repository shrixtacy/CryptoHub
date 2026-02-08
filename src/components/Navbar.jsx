import React, { useState, useEffect, useCallback } from "react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FiLock } from "react-icons/fi";
import "./Navbar.css";

function Navbar() {
const { currentUser, logout, isEmailProvider } = useAuth();

  const { theme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);

  const isDashboardPage = location.pathname === "/dashboard";

  const handleDropdownEnter = (label) => {
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
  setTimeout(() => setOpenDropdown(null), 100); 
};


  const handleDropdownClick = (label) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && !event.target.closest(".navbar-item")) {
        setOpenDropdown(null);
      }
    };

    const handleEscapeKey = (event) => {
      if (event.key === "Escape" && openDropdown) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [openDropdown]);

  const handleLogout = useCallback(async () => {
    try {
      await logout();
      navigate("/");
      setIsMobileMenuOpen(false);
    } catch (error) {
      console.error("Failed to logout:", error);
    }
  }, [logout, navigate]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setOpenDropdown(null);
  };

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

  return (
    <nav
      className={`navbar ${scrolled ? "scrolled" : ""} ${isMobileMenuOpen ? "has-mobile-menu" : ""} ${isDashboardPage ? "is-dashboard" : ""}`}
    >
      <div className="navbar-content">
        {/* Brand/Logo Section */}
        <Link to="/" className="navbar-logo">
          <div className="navbar-logo-icon">
            <img src="/crypto-logo.png" alt="CryptoHub" className="logo-img" />
          </div>
          <span className="logo-text">CryptoHub</span>
        </Link>

        {/* Desktop Navigation Menu */}
        {!isDashboardPage && (
    <ul className="navbar-menu">
      {(currentUser ? authenticatedNavLinks : navLinks).map((link) => (
        <li
          key={link.label}
          className="navbar-item dropdown-container"
          onMouseEnter={() => link.dropdown && handleDropdownEnter(link.label)}
          onMouseLeave={handleDropdownLeave}
        >
          {link.dropdown ? (
            <>
              <span 
                className="navbar-link dropdown-trigger"
                onClick={() => handleDropdownClick(link.label)}
                role="button"
                aria-expanded={openDropdown === link.label}
                aria-haspopup="true"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleDropdownClick(link.label);
                  }
                }}
              >
                {link.label}
              </span>

              <ul 
                className={`dropdown-menu ${openDropdown === link.label ? 'show' : ''}`}
                role="menu"
                aria-label={`${link.label} submenu`}
              >
                {link.dropdown ? (
                  <>
                    <span
                      className="navbar-link dropdown-trigger"
                      onClick={() => handleDropdownClick(link.label)}
                      role="button"
                      aria-expanded={openDropdown === link.label}
                      aria-haspopup="true"
                      tabIndex={0}
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
                      className={`dropdown-menu ${openDropdown === link.label ? "show" : ""}`}
                      role="menu"
                      aria-label={`${link.label} submenu`}
                    >
                      {link.dropdown.map((item) => (
                        <li key={item.to} role="none">
                          <Link
                            to={item.to}
                            className="dropdown-link"
                            onClick={closeMobileMenu}
                            role="menuitem"
                          >
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                ) : (
                  <Link
                    to={link.to}
                    className={`navbar-link ${
                      location.pathname === link.to ? "active" : ""
                    }`}
                    onClick={closeMobileMenu}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Right Side Actions */}
        <div className="navbar-actions">
          {/* Desktop Auth Buttons/User Menu */}
          <div className="desktop-auth">
            {currentUser ? (
              <div className="user-menu">
                <span className="user-email">{currentUser.email}</span>
                {isEmailProvider() && (
                  <Link
                    to="/change-password"
                    className="icon-btn"
                    title="Change Password"
                  >
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

          {/* Mobile Menu Toggle */}
          <button
            className={`navbar-toggle ${isMobileMenuOpen ? "active" : ""}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle navigation menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        {/* Mobile Auth Buttons (only in mobile menu) */}
        {isMobileMenuOpen && !currentUser && !isDashboardPage && (
          <div className="mobile-auth">
            <Link
              to="/login"
              className="navbar-btn navbar-btn-login"
              onClick={closeMobileMenu}
            >
              LOGIN
            </Link>
            <Link
              to="/signup"
              className="navbar-btn navbar-btn-signup"
              onClick={closeMobileMenu}
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
