const benefits = [
  {
    id: 1,
    icon: "🎟️",
    title: "Easy Ticket Booking",
    description:
      "Find your favorite concerts and book your tickets in just a few clicks.",
  },

  {
    id: 2,
    icon: "🔒",
    title: "Secure Payments",
    description:
      "Enjoy a safe and reliable checkout experience when purchasing your tickets.",
  },

  {
    id: 3,
    icon: "⚡",
    title: "Instant Confirmation",
    description:
      "Get your booking confirmation quickly after completing your purchase.",
  },

  {
    id: 4,
    icon: "🎵",
    title: "Discover Live Music",
    description:
      "Explore concerts, festivals and artists across Manipur and beyond.",
  },
];


function WhyBookWithUs() {
  return (
    <section className="why-book">

      {/* Section Heading */}

      <div className="why-book-heading">

        <p className="why-book-label">
          BOOK WITH CONFIDENCE
        </p>

        <h2>
          Why Book With Us?
        </h2>

        <p className="why-book-subtitle">
          Everything you need for a simple and enjoyable
          concert ticket booking experience.
        </p>

      </div>


      {/* Benefits */}

      <div className="benefits-grid">

        {benefits.map((benefit) => (

          <div
            className="benefit-card"
            key={benefit.id}
          >

            {/* Icon */}

            <div className="benefit-icon">
              {benefit.icon}
            </div>


            {/* Content */}

            <div className="benefit-content">

              <h3>
                {benefit.title}
              </h3>

              <p>
                {benefit.description}
              </p>

            </div>


            {/* Number */}

            <span className="benefit-number">
              0{benefit.id}
            </span>

          </div>

        ))}

      </div>

    </section>
  );
}

export default WhyBookWithUs;