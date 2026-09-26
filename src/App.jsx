import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import FeaturedConcert from "./components/FeaturedConcert";
import LatestEvents from "./components/LatestEvents";
import MusicGenres from "./components/MusicGenres";
import PopularArtists from "./components/PopularArtists";
import UpcomingEvents from "./components/UpcomingEvents";
import WhyBookWithUs from "./components/WhyBookWithUs";
import Footer from "./components/Footer";

import "./App.css";

function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />
        <FeaturedConcert />

        <LatestEvents />
        <MusicGenres />
        <PopularArtists />
        <UpcomingEvents />
        <WhyBookWithUs />
      </main>
      <Footer />  
    </>
  );
}

export default App;