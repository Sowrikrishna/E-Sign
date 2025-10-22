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
  Alert,
  Box,
  Skeleton,
  Divider
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';

// Mock data without categories
const mockDevices = [];

const Search = () => {
  const [selectedDevice, setSelectedDevice] = useState(null);
  const [devices, setDevices] = useState(mockDevices);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageLoading, setImageLoading] = useState(true);
  const [videoLoading, setVideoLoading] = useState(true);

  // Try to fetch from real API, fallback to mock data
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await fetch('http://localhost:5000/api/signs', {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
        });

        const contentType = response.headers.get('content-type');
        
        if (response.ok && contentType && contentType.includes('application/json')) {
          const data = await response.json();
          setDevices(data);
        } else {
          const responseText = await response.text();
          console.warn('API returned non-JSON response, using mock data.');
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

  // Reset loading states when device changes
  useEffect(() => {
    if (selectedDevice) {
      setImageLoading(true);
      setVideoLoading(true);
    }
  }, [selectedDevice]);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleVideoLoad = () => {
    setVideoLoading(false);
  };

  return (
    <Box
      sx={{
        width: '90%',
        maxWidth: '750px',
        margin: '0 auto',
        padding: '40px 10px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #003366 0%, #004080 100%)',
        minHeight: '100vh',
        borderRadius: '20px',
        marginTop: '20px',
        marginBottom: '20px',
        boxShadow: '0 10px 30px rgba(0, 51, 102, 0.3)'
      }}
    >
      {/* Header */}
      <Box sx={{ textAlign: 'center', mb: 4 }}>
        <Typography 
          variant="h3" 
          component="h1" 
          sx={{ 
            color: 'white', 
            fontWeight: 'bold',
            textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
            background: 'linear-gradient(45deg, #FFFFFF, #FFD700)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            mb: 1,
            fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }
          }}
        >
          Technical Sign Dictionary
        </Typography>
        <Typography 
          variant="h6" 
          sx={{ 
            color: 'rgba(255,255,255,0.9)',
            fontSize: { xs: '1rem', sm: '1.2rem' }
          }}
        >
          Learn Technical Signs with Visual Demonstrations
        </Typography>
      </Box>

      {error && (
        <Alert 
          severity="info" 
          sx={{ 
            width: '100%', 
            mb: 3,
            borderRadius: '15px',
            background: 'rgba(255,255,255,0.95)',
            color: '#003366',
            fontWeight: 'bold'
          }}
        >
          {error}
        </Alert>
      )}

      {/* Search Bar */}
      <Autocomplete
        options={devices}
        getOptionLabel={(option) => option.keyword}
        value={selectedDevice}
        onChange={(event, newValue) => setSelectedDevice(newValue)}
        loading={loading}
        sx={{ 
          width: '100%', 
          mb: 4,
          '& .MuiOutlinedInput-root': {
            borderRadius: '25px',
            background: 'white',
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
            '&:hover': {
              boxShadow: '0 12px 30px rgba(0,0,0,0.25)'
            }
          }
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            placeholder="Search for technical devices and signs..."
            variant="outlined"
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#003366', fontSize: '28px' }} />
                </InputAdornment>
              ),
              endAdornment: (
                <>
                  {loading ? <CircularProgress size={24} sx={{ color: '#003366' }} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        )}
      />

      {/* Device Card */}
      {selectedDevice && (
        <Card 
          sx={{ 
            width: '100%', 
            padding: 3,
            borderRadius: '20px',
            background: 'linear-gradient(145deg, #ffffff 0%, #f0f8ff 100%)',
            boxShadow: '0 20px 40px rgba(0, 51, 102, 0.2)',
            border: '2px solid #003366'
          }}
        >
          {/* Header with Title */}
          <Box sx={{ mb: 2 }}>
            <Typography 
              variant="h4" 
              component="h2"
              sx={{ 
                fontWeight: 'bold',
                background: 'linear-gradient(45deg, #003366, #004080)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textAlign: 'center',
                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
              }}
            >
              {selectedDevice.keyword.charAt(0).toUpperCase() + selectedDevice.keyword.slice(1)}
            </Typography>
          </Box>

          <Divider sx={{ 
            mb: 3, 
            height: '3px',
            background: 'linear-gradient(90deg, transparent, #003366, transparent)',
            border: 'none'
          }} />

          {/* Image Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <ImageIcon sx={{ color: '#003366', mr: 1, fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold' }}>
                Visual Reference
              </Typography>
            </Box>
            
            {imageLoading && (
              <Skeleton 
                variant="rectangular" 
                sx={{
                  height: { xs: 250, sm: 350, md: 450 },
                  borderRadius: '15px',
                  mb: 2,
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
                }}
              />
            )}
            <CardMedia
              component="img"
              src={selectedDevice.imageUrl}
              alt={selectedDevice.keyword}
              onLoad={handleImageLoad}
              sx={{
                display: imageLoading ? 'none' : 'block',
                height: { xs: 250, sm: 350, md: 450 },
                objectFit: "cover",
                borderRadius: '15px',
                boxShadow: '0 10px 25px rgba(0, 51, 102, 0.3)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 15px 35px rgba(0, 51, 102, 0.4)'
                }
              }}
            />
          </Box>

          {/* Video Section */}
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <PlayArrowIcon sx={{ color: '#003366', mr: 1, fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold' }}>
                Video Demonstration
              </Typography>
            </Box>
            
            {videoLoading && (
              <Skeleton 
                variant="rectangular" 
                sx={{
                  height: { xs: 250, sm: 350, md: 450 },
                  borderRadius: '15px',
                  mb: 2,
                  background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)'
                }}
              />
            )}
            <Box sx={{ display: videoLoading ? 'none' : 'block', position: 'relative' }}>
              <CardMedia
                component="iframe"
                height="450"
                src={selectedDevice.videoUrl}
                title={selectedDevice.keyword}
                onLoad={handleVideoLoad}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                sx={{
                  height: { xs: 250, sm: 350, md: 450 },
                  borderRadius: '15px',
                  boxShadow: '0 10px 25px rgba(0, 51, 102, 0.3)',
                  border: 'none',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 15px 35px rgba(0, 51, 102, 0.4)'
                  }
                }}
                allowFullScreen
              />
            </Box>
          </Box>

          {/* Description */}
          <CardContent sx={{ px: 0, pb: 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: 'center' }}>
              <DescriptionIcon sx={{ color: '#003366', mr: 1, fontSize: '2rem' }} />
              <Typography variant="h5" sx={{ color: '#003366', fontWeight: 'bold' }}>
                Text Reference
              </Typography>
            </Box>
            <Typography 
              variant="body1" 
              sx={{ 
                color: '#003366',
                lineHeight: 1.7,
                fontSize: '1.1rem',
                background: 'linear-gradient(135deg, rgba(0, 51, 102, 0.05) 0%, rgba(0, 64, 128, 0.1) 100%)',
                padding: 3,
                borderRadius: '15px',
                border: '2px solid rgba(0, 51, 102, 0.2)',
                fontWeight: '500'
              }}
            >
              {selectedDevice.description}
            </Typography>
          </CardContent>
        </Card>
      )}

      {/* No Device Selected State */}
      {!selectedDevice && (
        <Box 
          sx={{ 
            textAlign: 'center', 
            color: 'white',
            background: 'rgba(255, 255, 255, 0.1)',
            padding: 4,
            borderRadius: '20px',
            backdropFilter: 'blur(10px)',
            border: '2px dashed rgba(255, 255, 255, 0.3)',
            maxWidth: '500px',
            width: '100%'
          }}
        >
          <SearchIcon sx={{ fontSize: 80, mb: 2, opacity: 0.8, color: '#FFD700' }} />
          <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold', color: '#FFFFFF' }}>
            Discover Technical Signs
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, color: '#FFFFFF', lineHeight: 1.6 }}>
            Search above to explore technical devices and learn their sign language demonstrations through images and videos.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default Search;