import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5" color="textSecondary">
        Page not found
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/">
        Go to Home
      </Button>
    </div>
  );
};

export default NotFound;
