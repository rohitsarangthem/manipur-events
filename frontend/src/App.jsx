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

import ProtectedRoute from "./components/ProtectedRoute.jsx";


/* =========================================
   CUSTOMER DASHBOARD
========================================= */

import CustomerDashboard from "./dashboards/Customer/CustomerDashboard";
import MyTickets from "./dashboards/Customer/pages/MyTickets";
import MyOrders from "./dashboards/Customer/pages/MyOrders";
import Profile from "./dashboards/Customer/pages/Profile";


/* =========================================
   ORGANIZER DASHBOARD
========================================= */

import OrganizerLayout from "./dashboards/Organizer/OrganizerLayout";
import OrganizerDashboard from "./dashboards/Organizer/OrganizerDashboard";
import MyEvents from "./dashboards/Organizer/pages/MyEvents";
import CreateEvent from "./dashboards/Organizer/pages/CreateEvent";
import Bookings from "./dashboards/Organizer/pages/Bookings";
import Attendees from "./dashboards/Organizer/pages/Attendees";
import Revenue from "./dashboards/Organizer/pages/Revenue";
import OrganizerProfile from "./dashboards/Organizer/pages/OrganizerProfile";


/* =========================================
   ADMIN DASHBOARD
========================================= */

import AdminLayout from "./dashboards/Admin/AdminLayout";
import AdminDashboard from "./dashboards/Admin/AdminDashboard";
import AdminUsers from "./dashboards/Admin/pages/AdminUsers";
import AdminOrganizers from "./dashboards/Admin/pages/AdminOrganizers";
import AdminEvents from "./dashboards/Admin/pages/AdminEvents";
import AdminBookings from "./dashboards/Admin/pages/AdminBookings";
import AdminPayments from "./dashboards/Admin/pages/AdminPayments";
import AdminCategories from "./dashboards/Admin/pages/AdminCategories";
import AdminReports from "./dashboards/Admin/pages/AdminReports";


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

        {/* =========================================
            PUBLIC ROUTES
        ========================================= */}

        {/* HOME */}

        <Route
          path="/"
          element={<Home />}
        />


        {/* EVENTS */}

        <Route
          path="/events"
          element={<Events />}
        />


        {/* CATEGORY */}

        <Route
          path="/categories"
          element={<Category />}
        />


        {/* LOGIN */}

        <Route
          path="/login"
          element={<Login />}
        />


        {/* SIGNUP */}

        <Route
          path="/signup"
          element={<Signup />}
        />


        {/* =========================================
            CUSTOMER DASHBOARD
            Only customer can access
        ========================================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["customer"]}
            />
          }
        >

          {/* /account */}

          <Route
            path="/account"
            element={<CustomerDashboard />}
          />


          {/* /account/tickets */}

          <Route
            path="/account/tickets"
            element={<MyTickets />}
          />


          {/* /account/orders */}

          <Route
            path="/account/orders"
            element={<MyOrders />}
          />


          {/* /account/profile */}

          <Route
            path="/account/profile"
            element={<Profile />}
          />

        </Route>


        {/* =========================================
            ORGANIZER DASHBOARD
            Only organizer can access
        ========================================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["organizer"]}
            />
          }
        >

          <Route
            path="/organizer"
            element={<OrganizerLayout />}
          >

            {/* /organizer */}

            <Route
              index
              element={<OrganizerDashboard />}
            />


            {/* /organizer/events */}

            <Route
              path="events"
              element={<MyEvents />}
            />


            {/* /organizer/events/create */}

            <Route
              path="events/create"
              element={<CreateEvent />}
            />


            {/* /organizer/bookings */}

            <Route
              path="bookings"
              element={<Bookings />}
            />


            {/* /organizer/attendees */}

            <Route
              path="attendees"
              element={<Attendees />}
            />


            {/* /organizer/revenue */}

            <Route
              path="revenue"
              element={<Revenue />}
            />


            {/* /organizer/profile */}

            <Route
              path="profile"
              element={<OrganizerProfile />}
            />

          </Route>

        </Route>


        {/* =========================================
            ADMIN DASHBOARD
            Only admin can access
        ========================================= */}

        <Route
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            />
          }
        >

          <Route
            path="/admin"
            element={<AdminLayout />}
          >

            {/* /admin */}

            <Route
              index
              element={<AdminDashboard />}
            />


            {/* /admin/users */}

            <Route
              path="users"
              element={<AdminUsers />}
            />


            {/* /admin/organizers */}

            <Route
              path="organizers"
              element={<AdminOrganizers />}
            />


            {/* /admin/events */}

            <Route
              path="events"
              element={<AdminEvents />}
            />


            {/* /admin/bookings */}

            <Route
              path="bookings"
              element={<AdminBookings />}
            />


            {/* /admin/payments */}

            <Route
              path="payments"
              element={<AdminPayments />}
            />


            {/* /admin/categories */}

            <Route
              path="categories"
              element={<AdminCategories />}
            />


            {/* /admin/reports */}

            <Route
              path="reports"
              element={<AdminReports />}
            />

          </Route>

        </Route>

      </Routes>
    </>
  );
}


export default App;