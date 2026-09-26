import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import HeroSection from "./components/HeroSection/HeroSection";
import FeaturedConcert from "./components/FeaturedConcert/FeaturedConcert";
import LatestEvents from "./components/LatestEvents/LatestEvents";
import MusicGenres from "./components/MusicGenres/MusicGenres";
import PopularArtists from "./components/PopularArtists/PopularArtists";
import UpcomingEvents from "./components/UpcomingEvents/UpcomingEvents";
import WhyBookWithUs from "./components/WhyBookWithUs/WhyBookWithUs";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

import Category from "./pages/Category";
import Events from "./pages/Events";
import Login from "./pages/Login";

import "./App.css";


/* =========================================
   HOME PAGE
========================================= */

function Home() {
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


/* =========================================
   APP
========================================= */

function App() {

  return (
    <>
      <ScrollToTop />

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />


        {/* EVENTS */}
        <Route path="/events" element={<Events />} />


        {/* CATEGORY PAGE */}
        <Route path="/categories" element={<Category />} />


        {/* LOGIN PAGE */}
        <Route path="/login" element={<Login />} />

      </Routes>
    </>
  );

}

export default App;