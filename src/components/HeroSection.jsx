function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <p className="hero-small-title">
          DISCOVER & EXPERIENCE
        </p>

        <h1>
          Find events you'll
          <span> love.</span>
        </h1>

        <p className="hero-description">
          Discover concerts, festivals, workshops,
          sports and amazing experiences happening around you.
        </p>

        {/* Search */}

        <div className="hero-search">

          <div className="search-icon">
            🔍
          </div>

          <input
            type="text"
            placeholder="Search for events..."
          />

          <button>
            Search
          </button>

        </div>

      </div>

    </section>
  );
}

export default Hero;