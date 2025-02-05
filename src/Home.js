import React from "react";

export default function App() {
  const styles = {
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f0f4f8",
      fontFamily: "'Poppins', sans-serif",
      textAlign: "center",
    },
    heading: {
      fontSize: "3rem",
      color: "#2c3e50",
      marginBottom: "2rem",
    },
    link: {
      textDecoration: "none",
      fontSize: "1.5rem",
      color: "white",
      backgroundColor: "#3498db",
      padding: "0.8rem 2rem",
      borderRadius: "5px",
      boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
      transition: "all 0.3s ease-in-out",
    },
    linkHover: {
      backgroundColor: "#2980b9",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 10px rgba(0, 0, 0, 0.15)",
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Home Page</h1>
      <a
        href="login"
        style={styles.link}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.linkHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = styles.link.backgroundColor)}
      >
        Login
      </a>
    </div>
  );
}