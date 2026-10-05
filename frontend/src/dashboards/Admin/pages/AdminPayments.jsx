import { Link } from "react-router-dom";
import "./AdminPayments.css";

function AdminPayments() {
  const payments = [
    {
      id: "TXN-5024",
      booking: "ME-1024",
      customer: "Rahul Sharma",
      event: "Hills Music Festival 2026",
      method: "UPI",
      amount: 1998,
      date: "Sep 28, 2026",
      status: "Successful",
    },
    {
      id: "TXN-5023",
      booking: "ME-1023",
      customer: "Priya Singh",
      event: "Neon Nights",
      method: "Card",
      amount: 799,
      date: "Sep 27, 2026",
      status: "Successful",
    },
    {
      id: "TXN-5022",
      booking: "ME-1022",
      customer: "Amit Kumar",
      event: "Summer Beats 2026",
      method: "UPI",
      amount: 998,
      date: "Sep 26, 2026",
      status: "Pending",
    },
    {
      id: "TXN-5021",
      booking: "ME-1021",
      customer: "Anita Devi",
      event: "Hills Music Festival 2026",
      method: "Net Banking",
      amount: 599,
      date: "Sep 25, 2026",
      status: "Successful",
    },
    {
      id: "TXN-5020",
      booking: "ME-1020",
      customer: "Rakesh Meitei",
      event: "Rock Night Imphal",
      method: "UPI",
      amount: 1198,
      date: "Sep 24, 2026",
      status: "Successful",
    },
    {
      id: "TXN-5019",
      booking: "ME-1019",
      customer: "Neha Sharma",
      event: "Indie Music Evening",
      method: "Card",
      amount: 499,
      date: "Sep 23, 2026",
      status: "Refunded",
    },
  ];

  return (
    <div className="admin-payments">

      {/* =========================================
          PAGE HEADER
      ========================================= */}

      <div className="admin-payments-header">

        <div>
          <p className="admin-payments-label">
            PAYMENT MANAGEMENT
          </p>

          <h1>Payments</h1>

          <p className="admin-payments-subtitle">
            Monitor transactions, payments and refunds across the platform.
          </p>
        </div>

        <Link
          to="/admin"
          className="admin-payments-back"
        >
          ← Dashboard
        </Link>

      </div>


      {/* =========================================
          PAYMENT STATS
      ========================================= */}

      <div className="admin-payments-stats">

        <div className="admin-payment-stat">
          <span>Total Revenue</span>
          <strong>₹18.45L</strong>
          <small>+14% this month</small>
        </div>

        <div className="admin-payment-stat">
          <span>Successful Payments</span>
          <strong>₹17.82L</strong>
          <small>2,684 transactions</small>
        </div>

        <div className="admin-payment-stat">
          <span>Pending Payments</span>
          <strong>₹42,850</strong>
          <small>98 transactions</small>
        </div>

        <div className="admin-payment-stat">
          <span>Refunded</span>
          <strong>₹31,420</strong>
          <small>74 transactions</small>
        </div>

      </div>


      {/* =========================================
          PAYMENT TABLE CARD
      ========================================= */}

      <section className="admin-payments-card">

        <div className="admin-payments-toolbar">

          <div>
            <p>TRANSACTION HISTORY</p>
            <h2>All Payments</h2>
          </div>

          <div className="admin-payments-filters">

            <div className="admin-payments-search">

              <span>⌕</span>

              <input
                type="text"
                placeholder="Search transactions..."
              />

            </div>

            <select defaultValue="All">
              <option value="All">All Status</option>
              <option value="Successful">Successful</option>
              <option value="Pending">Pending</option>
              <option value="Refunded">Refunded</option>
            </select>

          </div>

        </div>


        {/* =========================================
            PAYMENT TABLE
        ========================================= */}

        <div className="admin-payments-table-wrapper">

          <table className="admin-payments-table">

            <thead>

              <tr>
                <th>Transaction</th>
                <th>Customer</th>
                <th>Event</th>
                <th>Method</th>
                <th>Amount</th>
                <th>Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>

            </thead>

            <tbody>

              {payments.map((payment) => (

                <tr key={payment.id}>

                  {/* Transaction */}

                  <td>

                    <strong className="admin-payment-id">
                      {payment.id}
                    </strong>

                    <span className="admin-payment-booking">
                      {payment.booking}
                    </span>

                  </td>


                  {/* Customer */}

                  <td>

                    <div className="admin-payment-customer">

                      <div className="admin-payment-avatar">
                        {payment.customer.charAt(0)}
                      </div>

                      <div>
                        <strong>{payment.customer}</strong>
                      </div>

                    </div>

                  </td>


                  {/* Event */}

                  <td>
                    <span className="admin-payment-event">
                      {payment.event}
                    </span>
                  </td>


                  {/* Method */}

                  <td>
                    <span className="admin-payment-method">
                      {payment.method}
                    </span>
                  </td>


                  {/* Amount */}

                  <td>

                    <strong className="admin-payment-amount">
                      ₹{payment.amount}
                    </strong>

                  </td>


                  {/* Date */}

                  <td>
                    <span className="admin-payment-date">
                      {payment.date}
                    </span>
                  </td>


                  {/* Status */}

                  <td>

                    <span
                      className={`admin-payment-status ${payment.status.toLowerCase()}`}
                    >
                      {payment.status}
                    </span>

                  </td>


                  {/* Action */}

                  <td>

                    <button className="admin-payment-action">
                      View
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* =========================================
            PAGINATION
        ========================================= */}

        <div className="admin-payments-pagination">

          <span>
            Showing 1–6 of 2,856 transactions
          </span>

          <div>

            <button disabled>
              ←
            </button>

            <button className="active">
              1
            </button>

            <button>
              2
            </button>

            <button>
              3
            </button>

            <button>
              ...
            </button>

            <button>
              476
            </button>

            <button>
              →
            </button>

          </div>

        </div>

      </section>

    </div>
  );
}

export default AdminPayments;