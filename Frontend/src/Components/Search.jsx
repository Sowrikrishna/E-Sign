import React, { useState, useEffect } from 'react';
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

      {/* Video Card */}
      {selectedDevice && (
        <Card sx={{ width: '100%', padding: "10px"}}>
          {/* Image */}
          <CardMedia
          component="img"
          src={sampleImage}
          alt="Device Image"
          sx={{marginBottom:"10px", height:"500px",objectFit:"fill",'@media(max-width: 772px)':{height: 400},'@media (max-width:500px)': {height: 300,
      }}}
          />

          {/* Video */}
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

export default Search;
