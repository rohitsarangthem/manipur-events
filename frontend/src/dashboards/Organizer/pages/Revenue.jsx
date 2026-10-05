import { useState } from "react";
import "./Revenue.css";

function Revenue() {

  const [search, setSearch] = useState("");
  const [eventFilter, setEventFilter] = useState("All Events");

  const transactions = [
    {
      id: "ME-TX-1024",
      customer: "Rahul Sharma",
      email: "rahul@example.com",
      event: "Hills Music Festival 2026",
      ticket: "VIP Ticket",
      date: "Sep 20, 2026",
      amount: 1998,
      status: "Paid",
    },
    {
      id: "ME-TX-1023",
      customer: "Priya Singh",
      email: "priya@example.com",
      event: "Neon Nights",
      ticket: "General Admission",
      date: "Sep 18, 2026",
      amount: 799,
      status: "Paid",
    },
    {
      id: "ME-TX-1022",
      customer: "Amit Kumar",
      email: "amit@example.com",
      event: "Summer Beats 2026",
      ticket: "General Admission",
      date: "Sep 15, 2026",
      amount: 998,
      status: "Paid",
    },
    {
      id: "ME-TX-1021",
      customer: "Anita Devi",
      email: "anita@example.com",
      event: "Hills Music Festival 2026",
      ticket: "General Admission",
      date: "Sep 12, 2026",
      amount: 599,
      status: "Pending",
    },
    {
      id: "ME-TX-1020",
      customer: "Rohit Singh",
      email: "rohit@example.com",
      event: "Neon Nights",
      ticket: "VIP Ticket",
      date: "Sep 10, 2026",
      amount: 1499,
      status: "Paid",
    },
  ];


  const eventRevenue = [
    {
      name: "Hills Music Festival 2026",
      tickets: 328,
      revenue: 327672,
    },
    {
      name: "Neon Nights",
      tickets: 215,
      revenue: 171785,
    },
    {
      name: "Summer Beats 2026",
      tickets: 189,
      revenue: 94311,
    },
  ];


  const filteredTransactions = transactions.filter((transaction) => {

    const matchesSearch =
      transaction.customer
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      transaction.email
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      transaction.event
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      transaction.id
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesEvent =
      eventFilter === "All Events" ||
      transaction.event === eventFilter;


    return matchesSearch && matchesEvent;

  });


  return (
    <div className="revenue-page">


      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="revenue-header">

        <div>

          <p className="revenue-label">
            REVENUE MANAGEMENT
          </p>

          <h1>
            Revenue
          </h1>

          <p className="revenue-subtitle">
            Track your event sales, earnings and transactions.
          </p>

        </div>

      </div>


      {/* =========================================
          STATISTICS
      ========================================= */}

      <div className="revenue-stats">


        <div className="revenue-stat-card">

          <div className="revenue-stat-icon">
            ₹
          </div>

          <div>

            <span>
              Total Revenue
            </span>

            <strong>
              ₹4,86,500
            </strong>

          </div>

        </div>


        <div className="revenue-stat-card">

          <div className="revenue-stat-icon">
            ↑
          </div>

          <div>

            <span>
              This Month
            </span>

            <strong>
              ₹1,24,850
            </strong>

          </div>

        </div>


        <div className="revenue-stat-card">

          <div className="revenue-stat-icon">
            🎫
          </div>

          <div>

            <span>
              Tickets Sold
            </span>

            <strong>
              732
            </strong>

          </div>

        </div>


        <div className="revenue-stat-card">

          <div className="revenue-stat-icon">
            ₹
          </div>

          <div>

            <span>
              Average Order
            </span>

            <strong>
              ₹664
            </strong>

          </div>

        </div>


      </div>


      {/* =========================================
          REVENUE BY EVENT
      ========================================= */}

      <section className="revenue-events-section">

        <div className="revenue-section-heading">

          <div>

            <p className="revenue-label">
              PERFORMANCE
            </p>

            <h2>
              Revenue by Event
            </h2>

          </div>

        </div>


        <div className="revenue-event-list">

          {eventRevenue.map((event) => (

            <div
              className="revenue-event-row"
              key={event.name}
            >

              <div className="revenue-event-info">

                <strong>
                  {event.name}
                </strong>

                <span>
                  {event.tickets} tickets sold
                </span>

              </div>


              <div className="revenue-progress-area">

                <div className="revenue-progress">

                  <div
                    className="revenue-progress-bar"
                    style={{
                      width:
                        `${Math.min(
                          (event.revenue / 327672) * 100,
                          100
                        )}%`
                    }}
                  />

                </div>

              </div>


              <strong className="revenue-event-amount">
                ₹{event.revenue.toLocaleString("en-IN")}
              </strong>

            </div>

          ))}

        </div>

      </section>


      {/* =========================================
          SEARCH / FILTER
      ========================================= */}

      <div className="revenue-toolbar">

        <div className="revenue-search">

          <span>
            🔍
          </span>

          <input
            type="text"
            placeholder="Search customer, event or transaction ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>


        <select
          className="revenue-filter"
          value={eventFilter}
          onChange={(e) => setEventFilter(e.target.value)}
        >

          <option>
            All Events
          </option>

          <option>
            Hills Music Festival 2026
          </option>

          <option>
            Neon Nights
          </option>

          <option>
            Summer Beats 2026
          </option>

        </select>

      </div>


      {/* =========================================
          TRANSACTIONS
      ========================================= */}

      <section className="revenue-transactions">

        <div className="revenue-section-heading">

          <div>

            <p className="revenue-label">
              TRANSACTIONS
            </p>

            <h2>
              Recent Transactions
            </h2>

          </div>

          <span>
            {filteredTransactions.length} Transactions
          </span>

        </div>


        <div className="revenue-table-wrapper">

          <table className="revenue-table">

            <thead>

              <tr>

                <th>
                  TRANSACTION
                </th>

                <th>
                  CUSTOMER
                </th>

                <th>
                  EVENT
                </th>

                <th>
                  TICKET
                </th>

                <th>
                  DATE
                </th>

                <th>
                  AMOUNT
                </th>

                <th>
                  STATUS
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredTransactions.map((transaction) => (

                <tr key={transaction.id}>

                  <td>

                    <strong className="transaction-id">
                      {transaction.id}
                    </strong>

                  </td>


                  <td>

                    <div className="revenue-customer">

                      <div className="revenue-avatar">
                        {transaction.customer.charAt(0)}
                      </div>

                      <div>

                        <strong>
                          {transaction.customer}
                        </strong>

                        <span>
                          {transaction.email}
                        </span>

                      </div>

                    </div>

                  </td>


                  <td>

                    <strong className="revenue-event-name">
                      {transaction.event}
                    </strong>

                  </td>


                  <td>
                    {transaction.ticket}
                  </td>


                  <td>
                    {transaction.date}
                  </td>


                  <td>

                    <strong className="transaction-amount">
                      ₹{transaction.amount.toLocaleString("en-IN")}
                    </strong>

                  </td>


                  <td>

                    <span
                      className={`transaction-status ${
                        transaction.status === "Paid"
                          ? "paid"
                          : "pending"
                      }`}
                    >
                      {transaction.status}
                    </span>

                  </td>

                </tr>

              ))}


              {filteredTransactions.length === 0 && (

                <tr>

                  <td
                    colSpan="7"
                    className="no-transactions"
                  >
                    No transactions found.
                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>

      </section>

    </div>
  );
}


export default Revenue;