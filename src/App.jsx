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
import Signup from "./pages/Signup";

import CustomerDashboard from "./dashboards/Customer/CustomerDashboard";
import MyTickets from "./dashboards/Customer/pages/MyTickets";
import MyOrders from "./dashboards/Customer/pages/MyOrders";

import Profile from "./dashboards/Customer/pages/Profile";

import OrganizerDashboard from "./dashboards/Organizer/OrganizerDashboard";
import MyEvents from "./dashboards/Organizer/pages/MyEvents";

import OrganizerLayout from "./dashboards/Organizer/OrganizerLayout";

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


        {/* SIGNUP PAGE */}
        <Route path="/signup" element={<Signup />} />

        {/* CUSTOMER DASHBOARD */}
        <Route path="/account" element={<CustomerDashboard />}/>


        {/* CUSTOMER DASHBOARD > MY TICKETS */}
        <Route path="/account/tickets" element={<MyTickets />}/>

        {/* CUSTOMER DASHBOARD > MY ORDERS */}
        <Route path="/account/orders" element={<MyOrders />}/>

        {/* CUSTOMER DASHBOARD > CUSTOMER PROFILE PAGE */}
        <Route path="/account/profile" element={<Profile />}/>

        {/* ORGANIZER LAYOUT - STARTS*/}
        <Route path="/organizer" element={<OrganizerLayout />}>
        <Route index element={<OrganizerDashboard />}/>
        <Route path="events" element={<MyEvents />}/>

        </Route>
        {/* ORGANIZER LAYOUT - ENDS*/}


      </Routes>
    </>
  );

}

export default App;