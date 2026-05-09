import { useEffect, useState } from "react";
import axios from "../api/axios";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";

export default function Trips() {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  const fetchTrips = async () => {
    try {
      const { data } = await axios.get("/trips");
      setTrips(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const deleteTrip = async (id) => {
    if (!window.confirm("Delete this trip?")) return;
    await axios.delete(`/trips/${id}`);
    fetchTrips();
  };

  return (
    <>
      <Sidebar />
      <div className="trips-container" style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>🌍 All Trips</h1>
          <p style={styles.subtitle}>Manage all your travel experiences</p>
        </div>

        {trips.length === 0 ? (
          <div style={styles.emptyState}>
            <p>No trips found. Create one to get started!</p>
          </div>
        ) : (
          <div style={styles.grid}>
            {trips.map((trip) => (
              <div key={trip._id} style={styles.card}>
                
                {/* IMAGE */}
                <div style={styles.imageContainer}>
                  <img
                    src={trip.heroImage?.url}
                    alt={trip.title}
                    style={styles.image}
                  />
                  <div style={styles.badge}>{trip.country}</div>
                </div>

                {/* CONTENT */}
                <div style={styles.content}>
                  <h3 style={styles.cardTitle}>{trip.title}</h3>

                  {trip.duration && (
                    <p style={styles.duration}>⏱️ {trip.duration} days</p>
                  )}

                  {/* NEW: Difficulty */}
                  {trip.difficulty && (
                    <p style={styles.duration}>
                      📊 Difficulty: {trip.difficulty}
                    </p>
                  )}

                  {/* NEW: Max Altitude */}
                  {trip.maxAltitude && (
                    <p style={styles.duration}>
                      🏔️ Max Altitude: {trip.maxAltitude}
                    </p>
                  )}

                  {/* NEW: Start/End Point */}
                  {(trip.startPoint || trip.endPoint) && (
                    <p style={styles.duration}>
                      📍 {trip.startPoint || "N/A"} → {trip.endPoint || "N/A"}
                    </p>
                  )}

                  {trip.overview && (
                    <p style={styles.overview}>
                      {trip.overview.substring(0, 80)}...
                    </p>
                  )}

                  <div style={styles.priceSection}>
                    <span style={styles.price}>₹{trip.price}</span>
                    {trip.oldPrice && (
                      <span style={styles.oldPrice}>₹{trip.oldPrice}</span>
                    )}
                  </div>

                  <div style={styles.detailsSummary}>
                    {trip.includes && trip.includes.length > 0 && (
                      <span style={styles.badge2}>
                        ✓ {trip.includes.length} Includes
                      </span>
                    )}
                    {trip.packages && trip.packages.length > 0 && (
                      <span style={styles.badge2}>
                        📦 {trip.packages.length} Packages
                      </span>
                    )}

                    {/* NEW: FAQs count */}
                    {trip.faqs && trip.faqs.length > 0 && (
                      <span style={styles.badge2}>
                        ❓ {trip.faqs.length} FAQs
                      </span>
                    )}
                  </div>

                  <div style={styles.buttonGroup}>
                    <button
                      style={styles.editButton}
                      onClick={() => navigate(`/edit/${trip._id}`)}
                    >
                      ✏️ Edit
                    </button>
                    <button
                      style={styles.deleteButton}
                      onClick={() => deleteTrip(trip._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* KEEPING YOUR STYLE EXACTLY SAME */
const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#f8f9fa",
    minHeight: "100vh",
    marginLeft: "260px",
  },
  header: {
    marginBottom: "40px",
    paddingBottom: "20px",
    borderBottom: "3px solid #007bff"
  },
  title: {
    fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
    color: "#1a1a2e",
    margin: "0 0 10px 0",
    fontWeight: "600"
  },
  subtitle: {
    color: "#666",
    fontSize: "clamp(0.9rem, 2vw, 1rem)",
    margin: "0"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
    gap: "25px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.08)",
    border: "1px solid #e9ecef",
    display: "flex",
    flexDirection: "column",
    cursor: "pointer"
  },
  imageContainer: {
    position: "relative",
    height: "200px",
    overflow: "hidden",
    backgroundColor: "#e9ecef"
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover"
  },
  badge: {
    position: "absolute",
    top: "10px",
    right: "10px",
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  content: {
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  cardTitle: {
    fontSize: "1.3rem",
    color: "#1a1a2e",
    margin: "0 0 12px 0",
    fontWeight: "600"
  },
  duration: {
    fontSize: "0.9rem",
    color: "#666",
    margin: "0 0 8px 0"
  },
  overview: {
    fontSize: "0.9rem",
    color: "#999",
    margin: "0 0 15px 0"
  },
  priceSection: {
    marginBottom: "12px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  price: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#007bff"
  },
  oldPrice: {
    fontSize: "0.9rem",
    color: "#999",
    textDecoration: "line-through"
  },
  detailsSummary: {
    display: "flex",
    gap: "8px",
    marginBottom: "15px",
    flexWrap: "wrap"
  },
  badge2: {
    backgroundColor: "#e7f3ff",
    color: "#007bff",
    padding: "5px 10px",
    borderRadius: "15px",
    fontSize: "0.8rem",
    fontWeight: "600"
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
    marginTop: "auto"
  },
  editButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(0, 123, 255, 0.3)"
  },
  deleteButton: {
    flex: 1,
    padding: "10px 15px",
    backgroundColor: "#dc3545",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "0.9rem",
    fontWeight: "600",
    transition: "all 0.3s ease",
    boxShadow: "0 2px 8px rgba(220, 53, 69, 0.3)"
  },
  emptyState: {
    textAlign: "center",
    padding: "60px 20px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    color: "#999"
  }
};