import "./Pricing.css";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      price: "₹0",
      description: "Get started with essential crypto tools.",
      features: [
        "Track top 50 cryptocurrencies",
        "Real-time price updates",
        "Basic charts & analytics",
        "Coin detail pages",
        "Responsive dashboard",
      ],
    },
    {
      name: "Pro",
      price: "₹399/month",
      description: "Unlock advanced features for serious traders.",
      features: [
        "Track up to 500 coins",
        "Advanced charting tools",
        "Portfolio tracking",
        "Price alerts & notifications",
        "Ad-free experience",
      ],
    },
    {
      name: "Premium",
      price: "₹999/month",
      description: "All-access pass for power users and professionals.",
      features: [
        "Unlimited coins & watchlists",
        "Customizable analytics",
        "Export data to CSV/Excel",
        "Early access to new features",
        "1-on-1 onboarding & support",
      ],
    },
  ];

  return (
    <div className="pricing-page">
      <div data-aos="fade-in" className="pricing-title">Pricing Plans</div>
      <div data-aos="fade-in" className="pricing-desc">Choose the plan that fits your crypto journey. Upgrade anytime!</div>
      <div className="pricing-cards">
        {plans.map((plan, index) => (
          <div key={index} data-aos={index % 2 === 0 ? "fade-up" : "fade-down"} className="pricing-card">
            <h2>{plan.name}</h2>
            <div className="price">{plan.price}</div>
            <div className="desc">{plan.description}</div>
            <ul className="pricing-features">
              {plan.features.map((feature, i) => (
                <li key={i}>✔ {feature}</li>
              ))}
            </ul>
            <button class="pricing-button">
              {plan.name === "Free" ? "Start for Free" : "Get Started"}
            </button>
          </div>
        ))}
      </div>
      <div data-aos="fade-out" style={{textAlign: 'center', marginTop: '40px', color: '#bdbdbd', fontSize: '1.1rem'}}>
        All plans include secure access, regular updates, and community support.
      </div>
    </div>
  );
}
