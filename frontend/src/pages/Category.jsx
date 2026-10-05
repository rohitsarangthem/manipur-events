import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import "./Category.css";

function Category() {
  const genres = [
    {
      id: 1,
      name: "Rock",
      description: "Powerful live performances and legendary guitar sounds.",
      icon: "🎸",
      events: "12 Events",
    },
    {
      id: 2,
      name: "Pop",
      description: "Catch popular artists and energetic live performances.",
      icon: "🎤",
      events: "8 Events",
    },
    {
      id: 3,
      name: "Electronic",
      description: "EDM, DJs and high-energy electronic music experiences.",
      icon: "🎧",
      events: "6 Events",
    },
    {
      id: 4,
      name: "Indie",
      description: "Discover independent artists and fresh new sounds.",
      icon: "🎶",
      events: "5 Events",
    },
    {
      id: 5,
      name: "Hip-Hop",
      description: "Experience rap, hip-hop and urban music live.",
      icon: "🎙️",
      events: "7 Events",
    },
    {
      id: 6,
      name: "Classical",
      description: "Enjoy timeless compositions and live performances.",
      icon: "🎻",
      events: "4 Events",
    },
    {
      id: 7,
      name: "Jazz",
      description: "Smooth sounds, live instruments and unforgettable sessions.",
      icon: "🎷",
      events: "3 Events",
    },
    {
      id: 8,
      name: "Folk",
      description: "Experience traditional and regional music performances.",
      icon: "🥁",
      events: "6 Events",
    },
  ];

  const locations = [
    {
      name: "Imphal",
      events: "12 Events",
    },
    {
      name: "Churachandpur",
      events: "5 Events",
    },
    {
      name: "Thoubal",
      events: "4 Events",
    },
    {
      name: "Ukhrul",
      events: "3 Events",
    },
  ];

  const experiences = [
    {
      icon: "🎤",
      title: "Live Concerts",
      description: "Experience your favorite artists performing live.",
    },
    {
      icon: "🎪",
      title: "Music Festivals",
      description: "Discover exciting music festivals and celebrations.",
    },
    {
      icon: "🎸",
      title: "Live Bands",
      description: "Find amazing local and touring live bands.",
    },
    {
      icon: "🎧",
      title: "DJ Nights",
      description: "Dance to live DJs and electronic music.",
    },
    {
      icon: "🎙️",
      title: "Acoustic Sessions",
      description: "Enjoy intimate and relaxed acoustic performances.",
    },
  ];

  return (
    <>
      <Navbar />

      <main className="category-page">

        {/* Hero */}
        <section className="category-hero">
          <div className="category-hero-content">
            <p className="category-label">EXPLORE YOUR SOUND</p>

            <h1>
              Explore Music <span>Categories</span>
            </h1>

            <p className="category-description">
              Discover concerts, festivals and live performances based on
              the music you love.
            </p>

            <a href="/events" className="category-hero-btn">
              Browse All Events →
            </a>
          </div>
        </section>


        {/* Genres */}
        <section className="category-genres">
          <div className="category-section-heading">
            <p className="category-section-label">FIND YOUR SOUND</p>

            <h2>Explore by Genre</h2>

            <p>
              Discover live music across different genres and find your
              next unforgettable experience.
            </p>
          </div>

          <div className="genre-grid">
            {genres.map((genre) => (
              <a
                href={`/category/${genre.name.toLowerCase()}`}
                className="genre-card"
                key={genre.id}
              >
                <div className="genre-icon">
                  {genre.icon}
                </div>

                <div className="genre-content">
                  <h3>{genre.name}</h3>

                  <p>{genre.description}</p>

                  <span>{genre.events}</span>
                </div>

                <div className="genre-arrow">
                  →
                </div>
              </a>
            ))}
          </div>
        </section>


        {/* Popular Categories */}
        <section className="popular-categories">
          <div className="category-section-heading">
            <p className="category-section-label">TRENDING NOW</p>

            <h2>Popular Right Now</h2>

            <p>
              See what music lovers are exploring and booking right now.
            </p>
          </div>

          <div className="popular-category-grid">

            <div className="popular-category-card">
              <span>01</span>
              <h3>Rock</h3>
              <p>12 upcoming events</p>
              <a href="/category/rock">Explore Rock →</a>
            </div>

            <div className="popular-category-card">
              <span>02</span>
              <h3>Pop</h3>
              <p>8 upcoming events</p>
              <a href="/category/pop">Explore Pop →</a>
            </div>

            <div className="popular-category-card">
              <span>03</span>
              <h3>Hip-Hop</h3>
              <p>7 upcoming events</p>
              <a href="/category/hip-hop">Explore Hip-Hop →</a>
            </div>

            <div className="popular-category-card">
              <span>04</span>
              <h3>Electronic</h3>
              <p>6 upcoming events</p>
              <a href="/category/electronic">Explore Electronic →</a>
            </div>

          </div>
        </section>


        {/* Category Spotlight */}
        <section className="category-spotlight">
          <div className="spotlight-content">
            <p className="category-section-label">
              THIS WEEK'S SPOTLIGHT
            </p>

            <h2>
              Rock is <span>calling.</span>
            </h2>

            <p>
              Discover upcoming rock concerts, live bands and energetic
              performances happening around Manipur.
            </p>

            <a href="/category/rock" className="spotlight-btn">
              Explore Rock Events →
            </a>
          </div>
        </section>


        {/* Upcoming Events */}
        <section className="category-upcoming">
          <div className="category-section-heading">
            <p className="category-section-label">WHAT'S HAPPENING</p>

            <h2>Upcoming Events</h2>

            <p>
              Find exciting live music events happening soon.
            </p>
          </div>

          <div className="upcoming-placeholder">

            <div className="upcoming-item">
              <span>OCT 18</span>

              <div>
                <h3>Rock Revolution</h3>
                <p>Imphal, Manipur · Rock</p>
              </div>

              <a href="/events">View Event →</a>
            </div>

            <div className="upcoming-item">
              <span>OCT 25</span>

              <div>
                <h3>Live Rock Nights</h3>
                <p>Imphal, Manipur · Rock</p>
              </div>

              <a href="/events">View Event →</a>
            </div>

            <div className="upcoming-item">
              <span>NOV 02</span>

              <div>
                <h3>The Rock Festival</h3>
                <p>Bengaluru, India · Rock</p>
              </div>

              <a href="/events">View Event →</a>
            </div>

          </div>
        </section>


        {/* Locations */}
        <section className="category-locations">
          <div className="category-section-heading">
            <p className="category-section-label">
              DISCOVER LOCAL MUSIC
            </p>

            <h2>Experience Live Music in Manipur</h2>

            <p>
              Explore concerts and live performances happening across
              different parts of Manipur.
            </p>
          </div>

          <div className="location-grid">
            {locations.map((location, index) => (
              <a
                href="/events"
                className="location-card"
                key={index}
              >
                <div>
                  <h3>{location.name}</h3>
                  <p>{location.events}</p>
                </div>

                <span>→</span>
              </a>
            ))}
          </div>
        </section>


        {/* Experiences */}
        <section className="category-experiences">
          <div className="category-section-heading">
            <p className="category-section-label">
              FIND YOUR EXPERIENCE
            </p>

            <h2>More Ways to Enjoy Live Music</h2>

            <p>
              Whether you want a massive concert or an intimate session,
              find an experience that fits your vibe.
            </p>
          </div>

          <div className="experience-grid">
            {experiences.map((experience, index) => (
              <div
                className="experience-card"
                key={index}
              >
                <div className="experience-icon">
                  {experience.icon}
                </div>

                <h3>{experience.title}</h3>

                <p>{experience.description}</p>

                <a href="/events">
                  Explore →
                </a>
              </div>
            ))}
          </div>
        </section>


        {/* Final CTA */}
        <section className="category-cta">
          <div>
            <p className="category-section-label">
              YOUR NEXT EXPERIENCE AWAITS
            </p>

            <h2>
              Ready to discover something <span>live?</span>
            </h2>

            <p>
              Explore concerts, festivals and music events happening
              around you.
            </p>

            <a href="/events" className="category-cta-btn">
              Explore All Events →
            </a>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}

export default Category;