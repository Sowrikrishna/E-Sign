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
  { id: 11, name: "scanner" },
  { id: 12, name: "projector" },
  { id: 13, name: "laptop" },
  { id: 14, name: "desktop" },
  { id: 15, name: "tablet" },
  { id: 16, name: "smartphone" },
  { id: 17, name: "hard drive" },
  { id: 18, name: "ssd" },
  { id: 19, name: "hdd" },
  { id: 20, name: "graphics card" },
  { id: 21, name: "motherboard" },
  { id: 22, name: "ram" },
  { id: 23, name: "power supply" },
  { id: 24, name: "cooling fan" },
  { id: 25, name: "heat sink" },
  { id: 26, name: "bluetooth adapter" },
  { id: 27, name: "wifi adapter" },
  { id: 28, name: "ethernet cable" },
  { id: 29, name: "hdmi cable" },
  { id: 30, name: "vga cable" },
  { id: 31, name: "usb cable" },
  { id: 32, name: "dvi cable" },
  { id: 33, name: "displayport cable" },
  { id: 34, name: "touchpad" },
  { id: 35, name: "trackball" },
  { id: 36, name: "gamepad" },
  { id: 37, name: "joystick" },
  { id: 38, name: "vr headset" },
  { id: 39, name: "headphones" },
  { id: 40, name: "earbuds" },
  { id: 41, name: "amplifier" },
  { id: 42, name: "sound card" },
  { id: 43, name: "network switch" },
  { id: 44, name: "firewall" },
  { id: 45, name: "server" },
  { id: 46, name: "nas" },
  { id: 47, name: "ups" },
  { id: 48, name: "extension cord" },
  { id: 49, name: "power strip" },
  { id: 50, name: "smartwatch" },
  { id: 51, name: "fitness tracker" },
  { id: 52, name: "digital camera" },
  { id: 53, name: "dslr" },
  { id: 54, name: "camcorder" },
  { id: 55, name: "smart tv" },
  { id: 56, name: "blu-ray player" },
  { id: 57, name: "media player" },
  { id: 58, name: "dvd player" },
  { id: 59, name: "set-top box" },
  { id: 60, name: "game console" },
  { id: 61, name: "joystick" },
  { id: 62, name: "steam deck" },
  { id: 63, name: "raspberry pi" },
  { id: 64, name: "arduino" },
  { id: 65, name: "3d printer" },
  { id: 66, name: "laser printer" },
  { id: 67, name: "inkjet printer" },
  { id: 68, name: "plotter" },
  { id: 69, name: "label printer" },
  { id: 70, name: "barcode scanner" },
  { id: 71, name: "fingerprint scanner" },
  { id: 72, name: "rfid reader" },
  { id: 73, name: "card reader" },
  { id: 74, name: "smart card" },
  { id: 75, name: "external ssd" },
  { id: 76, name: "external hdd" },
  { id: 77, name: "flash drive" },
  { id: 78, name: "sd card" },
  { id: 79, name: "micro sd card" },
  { id: 80, name: "cd drive" },
  { id: 81, name: "dvd drive" },
  { id: 82, name: "blu-ray drive" },
  { id: 83, name: "floppy drive" },
  { id: 84, name: "zip drive" },
  { id: 85, name: "tape drive" },
  { id: 86, name: "cable modem" },
  { id: 87, name: "dsl modem" },
  { id: 88, name: "fiber modem" },
  { id: 89, name: "network card" },
  { id: 90, name: "tv tuner" },
  { id: 91, name: "kvm switch" },
  { id: 92, name: "dock station" },
  { id: 93, name: "laptop stand" },
  { id: 94, name: "cooling pad" },
  { id: 95, name: "cable organizer" },
  { id: 96, name: "screen protector" },
  { id: 97, name: "keyboard cover" },
  { id: 98, name: "mouse pad" },
  { id: 99, name: "wrist rest" },
  { id: 100, name: "pc case" },
  { id: 101, name: "mini pc" },
  { id: 102, name: "workstation" },
  { id: 103, name: "chromebook" },
  { id: 104, name: "netbook" },
  { id: 105, name: "e-reader" },
  { id: 106, name: "voice assistant" },
  { id: 107, name: "security camera" },
  { id: 108, name: "baby monitor" },
  { id: 109, name: "thermostat" },
  { id: 110, name: "smart light" },
  { id: 111, name: "smart plug" },
  { id: 112, name: "smart lock" },
  { id: 113, name: "doorbell camera" },
  { id: 114, name: "motion sensor" },
  { id: 115, name: "smoke detector" },
  { id: 116, name: "carbon monoxide detector" },
  { id: 117, name: "robot vacuum" },
  { id: 118, name: "air purifier" },
  { id: 119, name: "smart fridge" },
  { id: 120, name: "smart oven" },
  { id: 121, name: "coffee maker" },
  { id: 122, name: "washing machine" },
  { id: 123, name: "dryer" },
  { id: 124, name: "dishwasher" },
  { id: 125, name: "electric kettle" },
  { id: 126, name: "toaster" },
  { id: 127, name: "microwave" },
  { id: 128, name: "rice cooker" },
  { id: 129, name: "slow cooker" },
  { id: 130, name: "air fryer" },
  { id: 131, name: "blender" },
  { id: 132, name: "food processor" },
  { id: 133, name: "smart scale" },
  { id: 134, name: "digital thermometer" },
  { id: 135, name: "blood pressure monitor" },
  { id: 136, name: "glucometer" },
  { id: 137, name: "pulse oximeter" },
  { id: 138, name: "hearing aid" },
  { id: 139, name: "electric toothbrush" },
 
];

const AllRoutes = () => {
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
        maxWidth: '800px',
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
        <Card sx={{ width: '100%' }}>
          <CardMedia
            component="iframe"
            height="315"
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Device Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
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
          <CardActions>
            <Button size="small">Share</Button>
            <Button size="small">Learn More</Button>
          </CardActions>
        </Card>
      )}
    </div>
  );
};

export default AllRoutes;
