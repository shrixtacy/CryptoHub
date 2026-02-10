import React from "react";
import "./About.css";

const About = () => {
  return (
    <div className="about-section fade-in">
      <h1 className="about-title-underline">About CryptoHub</h1>
      <p className="about-intro">
        CryptoHub is a comprehensive platform designed to provide users with real-time cryptocurrency market data, insightful analytics, and educational resources. Our mission is to empower both beginners and experienced traders with the tools and information they need to make informed decisions in the fast-paced world of digital assets.
      </p>
      <h2 className="about-title-underline">Key Features</h2>
      <div className="about-features-grid">
        <div className="about-feature-card"><span className="about-feature-icon">💹</span>Live cryptocurrency prices and market overviews</div>
        <div className="about-feature-card"><span className="about-feature-icon">📈</span>Interactive charts and analytics</div>
        <div className="about-feature-card"><span className="about-feature-icon">📰</span>Latest news and updates from the crypto world</div>
        <div className="about-feature-card"><span className="about-feature-icon">📚</span>Educational blogs and resources</div>
        <div className="about-feature-card"><span className="about-feature-icon">🏆</span>Leaderboard and activity tracking for community engagement</div>
        <div className="about-feature-card"><span className="about-feature-icon">🔒</span>Secure authentication and user management</div>
      </div>
      <h2 className="about-title-underline">Our Vision</h2>
      <p className="about-intro">
        We aim to foster a transparent and accessible crypto ecosystem by delivering accurate data, insightful content, and a supportive community. Whether you are new to cryptocurrencies or a seasoned investor, CryptoHub is your go-to destination for all things crypto.
      </p>
    </div>
  );
};

export default About;
