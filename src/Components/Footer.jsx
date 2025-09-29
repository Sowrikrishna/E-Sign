import React from 'react';

const Footer = () => {
  return (
    <div
      style={{
        backgroundColor: '#003366',
        color: 'white',
        fontSize: '0.9rem',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap'
      }}
    >
      {/* Left side */}
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <i className="fas fa-copyright" style={{ marginRight: '6px' }}></i>
        <span>
          2025 Bharathidasan University, Tiruchirappalli,<br></br> Tamil Nadu, India.
        </span>
      </div>

      {/* Right side */}
      <div style={{ textAlign: 'right' }}>
        <a
          href="#terms"
          style={{ color: 'white', textDecoration: 'none', marginRight: '10px' }}
        >
          Terms & Conditions
        </a>
        |
        <a
          href="#privacy"
          style={{ color: 'white', textDecoration: 'none', margin: '0 10px' }}
        >
          Privacy Policy
        </a>
        |
        <a
          href="#disclaimer"
          style={{ color: 'white', textDecoration: 'none', marginLeft: '10px' }}
        >
          Disclaimer
        </a>
        <div style={{ marginTop: '5px' }}>
          Website Maintained by: <strong>CDAP, BDU</strong>
        </div>
      </div>
    </div>
  );
};

export default Footer;
