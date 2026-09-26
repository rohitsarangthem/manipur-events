import { useState, useEffect, useRef } from "react";
import searchData from "../../data/searchData";
import './HeroSection.css';


function Hero() {

  const [search, setSearch] = useState("");

  const [showSuggestions, setShowSuggestions] = useState(false);

  const searchRef = useRef(null);


  // =========================================
  // FILTER SEARCH RESULTS
  // =========================================

  const filteredResults = searchData
    .filter((item) => {

      const searchText = search.toLowerCase();

      return (
        item.title.toLowerCase().includes(searchText) ||
        item.category.toLowerCase().includes(searchText) ||
        item.subtitle.toLowerCase().includes(searchText)
      );

    })
    .slice(0, 6);


  // =========================================
  // HANDLE SEARCH
  // =========================================

  const handleSearch = () => {

    if (!search.trim()) {
      return;
    }

    console.log("Searching for:", search);

    // Later we can navigate to:
    // /search?q=summer
  };

  useEffect(() => {

    const handleClickOutside = (event) => {

      if (
        searchRef.current &&
        !searchRef.current.contains(event.target)
      ) {
        setShowSuggestions(false);
      }

    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

    };

  }, []);


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
          Discover concerts, festivals, artists
          and amazing live music experiences.
        </p>


        {/* =================================
            SEARCH
        ================================= */}

        <div
          className="hero-search-wrapper"
          ref={searchRef}
        >

          <div className="hero-search">

            <div className="search-icon">
              🔍
            </div>


            <input
              type="text"
              placeholder="Search events, artists or genres..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowSuggestions(true);
              }}
              onFocus={() => {
                if (search.trim()) {
                  setShowSuggestions(true);
                }
              }}
            />


            <button
              onClick={handleSearch}
            >
              Search
            </button>

          </div>


          {/* =================================
              SUGGESTIONS
          ================================= */}

          {showSuggestions && search.trim() && (

            <div className="search-suggestions">

              {filteredResults.length > 0 ? (

                <>

                  <div className="suggestions-heading">
                    Search results
                  </div>


                  {filteredResults.map((item) => (

                    <a
                      href={item.link}
                      className="search-suggestion"
                      key={`${item.type}-${item.id}`}
                    >

                      {/* Icon */}

                      <div className="suggestion-icon">

                        {item.type === "event" && "🎵"}

                        {item.type === "artist" && "🎤"}

                        {item.type === "genre" && "🎧"}

                        {item.type === "location" && "📍"}

                      </div>


                      {/* Text */}

                      <div className="suggestion-content">

                        <div className="suggestion-title">
                          {item.title}
                        </div>

                        <div className="suggestion-subtitle">
                          {item.subtitle}
                        </div>

                      </div>


                      {/* Type */}

                      <span className="suggestion-type">
                        {item.category}
                      </span>

                    </a>

                  ))}

                </>

              ) : (

                <div className="no-search-results">

                  <div>
                    🔍
                  </div>

                  <p>
                    No results found
                  </p>

                  <span>
                    Try searching for an event, artist or genre.
                  </span>

                </div>

              )}

            </div>

          )}

        </div>

      </div>

    </section>
  );
}

export default Hero;