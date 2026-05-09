import { useEffect, useState } from "react";
import Calendar from "react-calendar";
import axios from "../api/axios";
import Sidebar from "../components/Sidebar";
import "../styles/buttons.css";
import 'react-calendar/dist/Calendar.css';

export default function AdminCalendar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchCalendar();
  }, []);

  const fetchCalendar = async () => {
    const res = await axios.get("/dashboard/calendar");
    setData(res.data);
  };

  const getCount = (date) => {
    const d = date.toISOString().split("T")[0];
    const found = data.find(x => x._id === d);
    return found ? found.count : 0;
  };

  return (
    <>
      <Sidebar />
      <div className="admin-calendar-container" style={styles.container}>
        <div style={styles.header}>
          <h1 style={styles.title}>📅 Admin Calendar</h1>
          <p style={styles.subtitle}>View booking counts by date</p>
        </div>

        <div style={styles.calendarContainer}>
          <Calendar
            tileContent={({ date }) => {
              const count = getCount(date);
              return count > 0 ? (
                <div style={styles.tileContent}>
                  <span style={styles.count}>{count}</span>
                  <span style={styles.bookingText}>booking{count > 1 ? 's' : ''}</span>
                </div>
              ) : null;
            }}
            style={styles.calendar}
          />
        </div>
      </div>
    </>
  );
}

const styles = {
  container: {
    marginLeft: '260px',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    minHeight: '100vh',
  },
  header: {
    marginBottom: '30px',
    textAlign: 'center',
    paddingBottom: '20px',
    borderBottom: '3px solid #007bff',
  },
  title: {
    color: '#1a1a2e',
    margin: '0 0 10px 0',
    fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
    fontWeight: '600',
  },
  subtitle: {
    color: '#666',
    margin: '0',
    fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
  },
  calendarContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
    padding: '20px',
    border: '1px solid #e9ecef',
  },
  calendar: {
    width: '100%',
    maxWidth: '600px',
    border: 'none',
    fontFamily: 'Arial, sans-serif',
  },
  tileContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '5px',
  },
  count: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    color: '#dc3545',
  },
  bookingText: {
    fontSize: '0.7rem',
    color: '#666',
    textTransform: 'lowercase',
  },
};

// Media queries for responsive design
const media = `
  @media (max-width: 1024px) {
    .admin-calendar-container {
      margin-left: 0 !important;
      margin-top: 60px !important;
    }
  }

  @media (max-width: 768px) {
    .admin-calendar-container {
      padding: 15px !important;
    }

    .react-calendar {
      font-size: 0.9rem !important;
    }
  }

  @media (max-width: 480px) {
    .admin-calendar-container {
      padding: 10px !important;
    }

    .react-calendar {
      font-size: 0.8rem !important;
    }

    .react-calendar button {
      padding: 8px 4px !important;
    }
  }

  @media print {
    .admin-calendar-container {
      margin-left: 0 !important;
      margin-top: 0 !important;
    }
  }
`;

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = media;
  document.head.appendChild(style);
}