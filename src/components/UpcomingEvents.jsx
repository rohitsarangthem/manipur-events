const upcomingEvents = [
  {
    id: 1,
    day: "18",
    month: "OCT",
    title: "Summer Beats 2026",
    category: "Live Music",
    date: "October 18, 2026",
    time: "7:00 PM",
    location: "Imphal, Manipur",
    price: 499,
    image: "/events/summer-beats.jpg",
  },

  {
    id: 2,
    day: "25",
    month: "OCT",
    title: "Neon Nights",
    category: "DJ Night",
    date: "October 25, 2026",
    time: "8:00 PM",
    location: "Imphal, Manipur",
    price: 799,
    image: "/events/neon-nights.jpg",
  },

  {
    id: 3,
    day: "02",
    month: "NOV",
    title: "Hills Music Festival",
    category: "Music Festival",
    date: "November 2, 2026",
    time: "5:00 PM",
    location: "Imphal, Manipur",
    price: 999,
    image: "/events/hills-music.jpg",
  },

  {
    id: 4,
    day: "15",
    month: "NOV",
    title: "Imphal Indie Night",
    category: "Indie Music",
    date: "November 15, 2026",
    time: "6:30 PM",
    location: "Imphal, Manipur",
    price: 599,
    image: "/events/summer-beats.jpg",
  },
];


function UpcomingEvents() {
  return (
    <section className="upcoming-events">

      {/* Heading */}
      <div className="upcoming-heading">

        <div>
          <p className="upcoming-label">
            MARK YOUR CALENDAR
          </p>

          <h2>
            Upcoming Events
          </h2>
        </div>

        <a
          href="/events"
          className="upcoming-view-all"
        >
          View All →
        </a>

      </div>


      {/* Events */}
      <div className="upcoming-list">

        {upcomingEvents.map((event) => (

          <article
            className="upcoming-card"
            key={event.id}
          >

            {/* Date */}
            <div className="upcoming-date">

              <span>
                {event.month}
              </span>

              <strong>
                {event.day}
              </strong>

            </div>


            {/* Image */}
            <div className="upcoming-image-wrapper">

              <img
                src={event.image}
                alt={event.title}
                className="upcoming-image"
              />

            </div>


            {/* Event Details */}
            <div className="upcoming-info">

              <span className="upcoming-category">
                {event.category}
              </span>

              <h3>
                {event.title}
              </h3>

              <div className="upcoming-meta">

                <span>
                  📅 {event.date}
                </span>

                <span>
                  ⏰ {event.time}
                </span>

              </div>

              <div className="upcoming-location">
                📍 {event.location}
              </div>

            </div>


            {/* Price + Button */}
            <div className="upcoming-action">

              <div className="upcoming-price">

                <small>
                  From
                </small>

                <strong>
                  ₹{event.price}
                </strong>

              </div>

              <a
                href={`/events/${event.id}`}
                className="upcoming-btn"
              >
                View Event →
              </a>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}

export default UpcomingEvents;