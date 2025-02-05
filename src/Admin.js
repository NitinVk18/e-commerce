export default function Admin() {
    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f4f4f4',
        fontFamily: 'Arial, sans-serif'
    };

    const headingStyle = {
        color: '#333',
        fontSize: '2rem',
        marginBottom: '20px'
    };

    const linkStyle = {
        display: 'inline-block',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: 'white',
        textDecoration: 'none',
        borderRadius: '5px',
        fontSize: '1.2rem',
        transition: 'background-color 0.3s ease-in-out'
    };

    return (
        <div style={containerStyle}>
            <h1 style={headingStyle}>Admin Home Page</h1>
            <a href="product" style={linkStyle}>Products</a>
        </div>
    );
}
