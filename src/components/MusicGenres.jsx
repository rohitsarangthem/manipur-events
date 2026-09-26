const genres = [
  {
    id: 1,
    name: "Rock",
    events: "12 Events",
    image: "/genres/rock-music.avif",
  },
  {
    id: 2,
    name: "EDM",
    events: "8 Events",
    image: "/genres/edm.jpg",
  },
  {
    id: 3,
    name: "Pop",
    events: "15 Events",
    image: "/genres/pop.avif",
  },
  {
    id: 4,
    name: "Indie",
    events: "6 Events",
    image: "/genres/indie.jpg",
  },
  {
    id: 5,
    name: "Hip-Hop",
    events: "9 Events",
    image: "/genres/hiphop.jpg",
  },
  {
    id: 6,
    name: "Bollywood",
    events: "11 Events",
    image: "/genres/bollywood.jpg",
  },
  {
    id: 7,
    name: "Classical",
    events: "5 Events",
    image: "/genres/classical.jpg",
  },
  {
    id: 8,
    name: "Folk",
    events: "7 Events",
    image: "/genres/folk.jpg",
  },
];


function MusicGenres() {
  return (
    <section className="music-genres">

      {/* Section Heading */}
      <div className="genres-heading">

        <div>
          <p className="genres-label">
            FIND YOUR SOUND
          </p>

          <h2>
            Music Genres
          </h2>
        </div>

        <a href="/genres" className="genres-view-all">
          View All →
        </a>

      </div>


      {/* Genre Grid */}
      <div className="genres-grid">

        {genres.map((genre) => (

          <a
            href={`/events?genre=${genre.name.toLowerCase()}`}
            className="genre-card"
            key={genre.id}
          >

            {/* Background Image */}
            <img
              src={genre.image}
              alt={genre.name}
              className="genre-image"
            />


            {/* Dark Overlay */}
            <div className="genre-overlay"></div>


            {/* Content */}
            <div className="genre-content">

              <h3>
                {genre.name}
              </h3>

              <span>
                {genre.events}
              </span>

            </div>

          </a>

        ))}

      </div>

    </section>
  );
}

export default MusicGenres;