const artists = [
  {
    id: 1,
    name: "Sorri Senjam",
    genre: "Indie Rock",
    events: "5 Events",
    image: "/artists/sorrisenjam.jpg",
  },
  {
    id: 2,
    name: "Benita Laishram",
    genre: "Modern Folk",
    events: "4 Events",
    image: "/artists/benitalaishram.jpg",
  },
  {
    id: 3,
    name: "Mangka Mayanglambam",
    genre: "Folk",
    events: "6 Events",
    image: "/artists/MangkaMayanglambam.jpg",
  },
  {
    id: 4,
    name: "Pushparani Huidrom",
    genre: "Manipur Film Music",
    events: "7 Events",
    image: "/artists/PushparaniHuidrom.jpg",
  },
  {
    id: 5,
    name: "Hamom Shadananda",
    genre: "Manipur Film Music",
    events: "3 Events",
    image: "/artists/HamomShadananda.jpg",
  },
  {
    id: 6,
    name: "Preeti Yumnam",
    genre: "Rock",
    events: "4 Events",
    image: "/artists/PreetiYumnam.jpg",
  },
  {
    id: 7,
    name: "Meewakching",
    genre: "Inde Rock",
    events: "5 Events",
    image: "/artists/Meewakching.webp",
  },
  {
    id: 8,
    name: "Ranbir Thouna",
    genre: "Indie Pop",
    events: "3 Events",
    image: "/artists/ranbirthouna.jpg",
  },
];


function PopularArtists() {
  return (
    <section className="popular-artists">

      {/* Section Heading */}
      <div className="artists-heading">

        <div>
          <p className="artists-label">
            DISCOVER THE ARTISTS
          </p>

          <h2>
            Popular Artists
          </h2>
        </div>

        <a
          href="/artists"
          className="artists-view-all"
        >
          View All →
        </a>

      </div>


      {/* Artists */}
      <div className="artists-grid">

        {artists.map((artist) => (

          <a
            key={artist.id}
            href={`/artists/${artist.name
              .toLowerCase()
              .replaceAll(" ", "-")}`}
            className="artist-card"
          >

            {/* Artist Image */}
            <div className="artist-image-wrapper">

              <img
                src={artist.image}
                alt={artist.name}
                className="artist-image"
              />

            </div>


            {/* Artist Info */}
            <div className="artist-info">

              <h3>
                {artist.name}
              </h3>

              <p>
                {artist.genre}
              </p>

              <span>
                {artist.events}
              </span>

            </div>

          </a>

        ))}

      </div>

    </section>
  );
}

export default PopularArtists;