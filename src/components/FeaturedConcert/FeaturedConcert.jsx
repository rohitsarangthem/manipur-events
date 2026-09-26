import "./FeaturedConcert.css";

function FeaturedConcert() {
  return (
    <section className="featured-concert">

      <div className="featured-inner">

        {/* Left - Image */}
        <div className="featured-image-wrapper">

          <img
            src="/events/hills-music.jpg"
            alt="Hills Music Festival"
            className="featured-image"
          />

          <span className="featured-badge">
            FEATURED CONCERT
          </span>

        </div>


        {/* Right - Content */}
        <div className="featured-content">

          <p className="featured-label">
            LIVE MUSIC EXPERIENCE
          </p>

          <h2>
            Hills Music Festival 2026
          </h2>

          <p className="featured-description">
            Experience an unforgettable evening of live music,
            talented artists and an incredible atmosphere.
            Get ready for a night you won't forget.
          </p>


          {/* Event information */}
          <div className="featured-details">

            <div className="featured-detail">
              <span className="detail-icon">
                📅
              </span>

              <div>
                <small>Date</small>
                <strong>November 2, 2026</strong>
              </div>
            </div>


            <div className="featured-detail">
              <span className="detail-icon">
                ⏰
              </span>

              <div>
                <small>Time</small>
                <strong>5:00 PM onwards</strong>
              </div>
            </div>


            <div className="featured-detail">
              <span className="detail-icon">
                📍
              </span>

              <div>
                <small>Location</small>
                <strong>Imphal, Manipur</strong>
              </div>
            </div>

          </div>


          {/* Bottom */}
          <div className="featured-bottom">

            <div className="featured-price">

              <small>Tickets from</small>

              <strong>
                ₹999
              </strong>

            </div>


            <button className="featured-btn">
              View Concert
              <span>→</span>
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}

export default FeaturedConcert;