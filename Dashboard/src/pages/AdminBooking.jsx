import { useEffect, useState } from "react";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  const fetchBookings = async () => {
    const { data } = await axios.get("/bookings");
    setBookings(data);
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const verify = async (id) => {
    await axios.put(`/bookings/${id}/verify`);
    fetchBookings();
  };

  return (
    <>
      <Sidebar />
      <div className="admin-bookings-container" style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📋 Admin Bookings</h1>
          <p style={styles.subtitle}>Manage and verify customer bookings</p>
        </div>

        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Full Name</th>
                <th style={styles.th}>Email</th>
                <th style={styles.th}>Travel Date</th>
                <th style={styles.th}>Total Amount</th>
                <th style={styles.th}>Payment Status</th>
                <th style={styles.th}>Bank Slip</th>
                <th style={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map(b => (
                // <tr key={b._id} style={styles.tr}>
                //   <td style={styles.td}>{b.fullName}</td>
                //   <td style={styles.td}>{b.email}</td>
                //   <td style={styles.td}>{new Date(b.travelDate).toDateString()}</td>
                //   <td style={styles.td}>₹{b.totalAmount}</td>
                //   <td style={styles.td}>
                //     <span style={{
                //       ...styles.status,
                //       backgroundColor: b.paymentStatus === 'verified' ? '#28a745' : '#ffc107'
                //     }}>
                //       {b.paymentStatus}
                //     </span>
                //   </td>
                //   <td style={styles.td}>
                //     {b.bankSlip?.url && (
                //       <a href={b.bankSlip.url} target="_blank" style={styles.link}>View Slip</a>
                //     )}
                //   </td>
                //   <td style={styles.td}>
                //     <button 
                //       onClick={() => verify(b._id)}
                //       style={styles.button}
                //       disabled={b.paymentStatus === 'verified'}
                //     >
                //       {b.paymentStatus === 'verified' ? 'Verified' : 'Verify Payment'}
                //     </button>
                //   </td>
                // </tr>
                <tr key={b._id}>
                <td>{b.buyer?.firstName} {b.buyer?.lastName}</td>
                <td>{b.buyer?.email}</td>
                <td>{b.numberOfPeople}</td>
                <td>{new Date(b.travelDate).toDateString()}</td>
                <td>₹{b.totalAmount}</td>
                <td>{b.paymentStatus}</td>

                <td>
                  {b.bankSlip?.url && (
                    <a href={b.bankSlip.url} target="_blank">
                      View
                    </a>
                  )}
                </td>

                <td>
                  <button onClick={() => verify(b._id)}>
                    Verify
                  </button>
                </td>
              </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    marginLeft: '250px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
    '@media (max-width: 768px)': {
      marginLeft: '0',
      padding: '10px',
    },
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
  },
  title: {
    color: '#333',
    margin: '0 0 10px 0',
    fontSize: '2rem',
    fontWeight: 'bold',
  },
  subtitle: {
    color: '#666',
    margin: '0',
    fontSize: '1rem',
  },
  tableContainer: {
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    overflowX: 'auto',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
    borderBottom: '2px solid #dee2e6',
  },
  tr: {
    borderBottom: '1px solid #dee2e6',
    '&:hover': {
      backgroundColor: '#f1f3f4',
    },
  },
  td: {
    padding: '12px',
    verticalAlign: 'middle',
  },
  status: {
    padding: '4px 8px',
    borderRadius: '4px',
    color: '#fff',
    fontSize: '0.8rem',
    textTransform: 'capitalize',
  },
  link: {
    color: '#007bff',
    textDecoration: 'none',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  button: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '10px 16px',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '0.9rem',
    fontWeight: '600',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(40, 167, 69, 0.3)',
  },
  container: {
    marginLeft: '260px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  '@media (maxWidth: 1024px)': {
    container: {
      marginLeft: '0',
      marginTop: '60px',
      padding: '15px',
    },
  },
};