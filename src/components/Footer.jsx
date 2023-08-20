import React from 'react';
import { Container, Typography } from '@mui/material';
import { FaTwitter, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const footerStyle = {
    backgroundColor: '#212121', // Dark navy blue grey color
    color: '#FFFFFF', // White text color
    padding: '24px 0',
    textAlign: 'center',
    width: '100%',
    display: "flex"
  };

  const textContainerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  function github() {
    const url = "https://github.com/lemn09"
    window.open(url, "_blank");
  }

  function twitter() {
    const url = "https://twitter.com/Monish72202353"
    window.open(url, "_blank");
  }

  return (
    <footer style={footerStyle}>
      <Container maxWidth="lg" style={textContainerStyle}>
        <Typography variant="body2" style={{ fontFamily: "Quicksand" }}>
          &copy; {new Date().getFullYear()} Learnify. All rights reserved.
        </Typography>
      </Container>
      <div style={{
        display: "flex",
        justifyContent: "end",
        alignItems: "center",
        marginRight: "2%",
      }}>

        <div
          onClick={twitter}
          style={{ marginRight: '18px', cursor: 'pointer' }}
        >
          <FaTwitter size={24} />
        </div>
        <div
          style={{ cursor: 'pointer' }}
          onClick={github}
        > <FaGithub size={24} /> </div>
      </div>
    </footer>
  );
};

export default Footer;
