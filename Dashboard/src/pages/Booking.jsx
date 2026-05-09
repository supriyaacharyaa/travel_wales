import { useEffect, useState } from "react";
import axios from "../api/axios";

export default function Bookings() {

  const [bookings, setBookings] = useState([]);
  const [search, setSearch] = useState("");

  const fetchData = async () => {
    const { data } = await axios.get("/bookings");
    setBookings(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const updateStatus = async (id, status) => {
    await axios.put(`/bookings/${id}/status`, { status });
    fetchData();
  };

  const filtered = bookings.filter(b =>
    b.fullName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      <h1>Bookings</h1>

      <input
        placeholder="Search by name..."
        style={styles.search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div style={styles.tableWrap}>
        <table style={styles.table}>

          <thead>
            <tr>
              <th>Name</th>
              <th>Trip</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(b => (
              <tr key={b._id}>

                <td>{b.fullName}</td>
                <td>{b.trip?.title}</td>
                <td>₹{b.totalAmount}</td>

                <td>
                  <span style={{
                    ...styles.status,
                    background:
                      b.paymentStatus === "verified"
                        ? "#22c55e"
                        : "#f59e0b"
                  }}>
                    {b.paymentStatus}
                  </span>
                </td>

                <td>
                  <button
                    style={styles.approve}
                    onClick={() => updateStatus(b._id, "verified")}
                  >
                    Approve
                  </button>

                  <button
                    style={styles.pending}
                    onClick={() => updateStatus(b._id, "pending")}
                  >
                    Pending
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
}

const styles = {
  container: { marginLeft: 260, padding: 20 },

  search: {
    padding: 10,
    marginBottom: 10,
    width: "300px"
  },

  tableWrap: {
    overflowX: "auto",
    background: "#fff",
    borderRadius: 10
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  status: {
    padding: "5px 10px",
    borderRadius: 6,
    color: "white"
  },

  approve: {
    background: "#22c55e",
    color: "white",
    marginRight: 5
  },

  pending: {
    background: "#f59e0b",
    color: "white"
  }
};