{/*import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  InputAdornment
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import sampleImage from '../assets/Capture.png';

const datadisabled = [
  { id: 1, name: 'sowri' },
  { id: 2, name: "cpu" },
  { id: 3, name: "printer" },
  { id: 4, name: "speaker" },
  { id: 5, name: "keyboard" },
  { id: 6, name: "mouse" },
  { id: 7, name: "webcam" },
  { id: 8, name: "microphone" },
  { id: 9, name: "router" },
  { id: 10, name: "modem" },
 
];

const Search= () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [description, setDescription] = useState('');

  // Simulate fetching description from API
  useEffect(() => {
    if (selectedDevice) {
      setTimeout(() => {
        setDescription(`This is a detailed description of the ${selectedDevice.name}. It is an essential component in a computer setup.`);
      }, 500);
    }
  }, [selectedDevice]);

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{color: "brown" , marginBottom: 30}}>Technical Sign Dictionary</h1>
      <Autocomplete
        options={datadisabled}
        getOptionLabel={(option) => option.name}
        onChange={(event, newValue) => setSelectedDevice(newValue)}
        sx={{ width: '100%', marginBottom: 4 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for a device"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              style: {
                borderRadius: 25
              }
            }}
          />
        )}
      />

      {/* Video Card 
      {selectedDevice && (
        <Card sx={{ width: '100%', padding: "10px"}}>
          {/* Image 
          <CardMedia
          component="img"
          src={sampleImage}
          alt="Device Image"
          sx={{marginBottom:"10px", height:"500px",objectFit:"fill",'@media(max-width: 772px)':{height: 400},'@media (max-width:500px)': {height: 300,
      }}}
          />

          {/* Video 
          <CardMedia
            component="iframe"
            height="500"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Device Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sx={{'@media(max-width: 772px)':{height: 400},'@media (max-width:500px)': {height: 300,
      }}}
            allowFullScreen
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedDevice.name.charAt(0).toUpperCase() + selectedDevice.name.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {description || 'Loading description...'}
            </Typography>
          </CardContent>

          
    </Card>

      )}
    </div>
  );
};

export default Search; */}

import React, { useState, useEffect } from 'react';
import {
  Autocomplete,
  TextField,
  Card,
  CardContent,
  CardMedia,
  Typography,
  InputAdornment,
  CircularProgress,
  Alert
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import sampleImage from '../assets/Capture.png';

// Mock data that matches your MongoDB schema
const mockDevices = [
  {
    _id: '1',
    keyword: 'cpu',
    description: 'Central Processing Unit - the primary component of a computer that performs most of the processing inside a computer.',
    imageUrl: sampleImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: '2',
    keyword: 'printer',
    description: 'A device that produces text and graphics on physical media like paper or transparency film.',
    imageUrl: sampleImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: '3',
    keyword: 'keyboard',
    description: 'An input device used to enter characters and functions into the computer system by pressing buttons, or keys.',
    imageUrl: sampleImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: '4',
    keyword: 'mouse',
    description: 'A hand-held pointing device that detects two-dimensional motion relative to a surface.',
    imageUrl: sampleImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    _id: '5',
    keyword: 'monitor',
    description: 'An output device that displays information in pictorial or textual form.',
    imageUrl: sampleImage,
    videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  }
];

const Search = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState(mockDevices); // Start with mock data
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Try to fetch from real API, fallback to mock data
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        setError('');
        
        // Try to fetch from API
        const response = await fetch('http://localhost:5000/api/signs', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        // Check if response is HTML (error page) or JSON
        const contentType = response.headers.get('content-type');
        
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setDevices(data);
          console.log('Successfully loaded data from API');
        } else {
          // If API fails, use mock data and show warning
          const responseText = await response.text();
          console.warn('API returned non-JSON response, using mock data. Response:', responseText.substring(0, 100));
          setDevices(mockDevices);
          setError('Connected to demo data. Backend server not available.');
        }
        
      } catch (err) {
        console.warn('Cannot connect to API, using mock data:', err.message);
        setDevices(mockDevices);
        setError('Using demo data. Backend server not available.');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  return (
    <div
      style={{
        width: '90%',
        maxWidth: '700px',
        margin: '0 auto',
        padding: '40px 0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <h1 style={{ color: "brown", marginBottom: 30 }}>Technical Sign Dictionary</h1>
      
      {error && (
        <Alert severity="info" sx={{ width: '100%', marginBottom: 2 }}>
          {error}
        </Alert>
      )}

      <Autocomplete
        options={devices}
        getOptionLabel={(option) => option.keyword}
        value={selectedDevice}
        onChange={(event, newValue) => setSelectedDevice(newValue)}
        loading={loading}
        sx={{ width: '100%', marginBottom: 4 }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for devices (e.g., cpu, printer, keyboard)"
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
              style: {
                borderRadius: 25
              }
            }}
          />
        )}
      />

      {/* Device Card */}
      {selectedDevice && (
        <Card sx={{ width: '100%', padding: "10px" }}>
          {/* Image */}
          <CardMedia
            component="img"
            src={selectedDevice.imageUrl || sampleImage}
            alt={selectedDevice.keyword}
            sx={{
              marginBottom: "10px",
              height: "500px",
              objectFit: "fill",
              '@media (max-width: 772px)': { height: 400 },
              '@media (max-width: 500px)': { height: 300 }
            }}
          />

          {/* Video */}
          <CardMedia
            component="iframe"
            height="500"
            src={selectedDevice.videoUrl}
            title={selectedDevice.keyword}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            sx={{
              '@media (max-width: 772px)': { height: 400 },
              '@media (max-width: 500px)': { height: 300 }
            }}
            allowFullScreen
          />

          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {selectedDevice.keyword.charAt(0).toUpperCase() + selectedDevice.keyword.slice(1)}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.6 }}>
              {selectedDevice.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Search;