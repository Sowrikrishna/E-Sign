import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Alert,
  Dialog,
  DialogContent,
  IconButton,
  AppBar,
  Toolbar,
  Chip
} from '@mui/material';
import {
  Close as CloseIcon,
  PlayArrow as PlayIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon
} from '@mui/icons-material';

const ViewAllSigns = () => {
  const [signs, setSigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mutedVideos, setMutedVideos] = useState(new Set());

  // Fixed dimensions for all cards and modals
  const CARD_WIDTH = 300;
  const CARD_HEIGHT = 400;
  const MEDIA_HEIGHT = 250;
  const MODAL_WIDTH = 600;
  const MODAL_HEIGHT = 500;

  // Fetch all signs from MongoDB
  const fetchSigns = async () => {
    try {
      setLoading(true);
      setError('');
      
      const response = await fetch('http://localhost:5000/api/signs');
      
      if (!response.ok) {
        throw new Error('Failed to fetch signs');
      }
      
      const data = await response.json();
      setSigns(data);
    } catch (err) {
      console.error('Error fetching signs:', err);
      setError('Failed to load signs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSigns();
  }, []);

  // Handle media view in modal
  const handleMediaView = (mediaUrl, mediaType, keyword) => {
    setSelectedMedia({ url: mediaUrl, type: mediaType, title: keyword });
  };

  // Close modal
  const handleCloseMedia = () => setSelectedMedia(null);

  // Toggle video mute
  const toggleMute = (signId, e) => {
    e.stopPropagation();
    setMutedVideos(prev => {
      const newSet = new Set(prev);
      if (newSet.has(signId)) {
        newSet.delete(signId);
      } else {
        newSet.add(signId);
      }
      return newSet;
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Header */}
      <Box textAlign="center" mb={6}>
        <Typography 
          variant="h3" 
          component="h1" 
          gutterBottom 
          sx={{ 
            fontWeight: 'bold',
            background: 'linear-gradient(45deg, #FF6B35 30%, #FF8E53 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            mb: 2
          }}
        >
          Technical Sign Dictionary
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
          All signs with consistent dimensions
        </Typography>
        <Chip 
          label={`${signs.length} Technical Signs`} 
          color="primary" 
          variant="filled"
          sx={{ 
            backgroundColor: 'primary.main',
            color: 'white',
            fontWeight: 'bold'
          }}
        />
      </Box>

      {/* Signs Grid */}
      {signs.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="text.secondary">
            No technical signs found in the database.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {signs.map((sign) => (
            <Grid item key={sign._id}>
              <Card 
                sx={{ 
                  width: CARD_WIDTH,
                  height: CARD_HEIGHT,
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 3,
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                {/* Media Preview Section - Fixed Dimensions */}
                <Box 
                  sx={{ 
                    position: 'relative',
                    width: CARD_WIDTH,
                    height: MEDIA_HEIGHT,
                    overflow: 'hidden',
                    backgroundColor: '#f5f5f5',
                    cursor: 'pointer'
                  }}
                  onClick={() => handleMediaView(sign.imageUrl, 'image', sign.keyword)}
                >
                  {/* Image Preview */}
                  <Box
                    component="img"
                    src={sign.imageUrl}
                    alt={`${sign.keyword} sign`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.3s ease'
                    }}
                  />
                  
                  {/* Video Overlay Preview */}
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      '&:hover': {
                        opacity: 1
                      }
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMediaView(sign.videoUrl, 'video', sign.keyword);
                    }}
                  >
                    {/* Video Thumbnail with Controls */}
                    <Box sx={{ textAlign: 'center', color: 'white' }}>
                      <PlayIcon sx={{ fontSize: 48, mb: 1 }} />
                      <Typography variant="body2" fontWeight="bold">
                        Watch Video
                      </Typography>
                    </Box>
                  </Box>

                  {/* Mute/Unmute Toggle */}
                  <IconButton
                    sx={{
                      position: 'absolute',
                      bottom: 8,
                      right: 8,
                      backgroundColor: 'rgba(0,0,0,0.7)',
                      color: 'white',
                      '&:hover': {
                        backgroundColor: 'rgba(0,0,0,0.9)',
                      }
                    }}
                    onClick={(e) => toggleMute(sign._id, e)}
                  >
                    {mutedVideos.has(sign._id) ? <VolumeOffIcon /> : <VolumeUpIcon />}
                  </IconButton>
                </Box>

                {/* Content Section */}
                <CardContent sx={{ 
                  flexGrow: 1, 
                  p: 3,
                  height: CARD_HEIGHT - MEDIA_HEIGHT,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between'
                }}>
                  <Box>
                    {/* Keyword */}
                    <Typography 
                      variant="h6" 
                      component="h2" 
                      gutterBottom
                      sx={{ 
                        fontWeight: 'bold',
                        textTransform: 'capitalize',
                        color: 'text.primary',
                        fontSize: '1.1rem',
                        lineHeight: 1.2
                      }}
                    >
                      {sign.keyword}
                    </Typography>

                    {/* Description */}
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                      sx={{ 
                        lineHeight: 1.4,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                      }}
                    >
                      {sign.description}
                    </Typography>
                  </Box>

                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mt: 2 }}>
                    <Chip
                      icon={<PlayIcon />}
                      label="Video"
                      variant="outlined"
                      size="small"
                      onClick={() => handleMediaView(sign.videoUrl, 'video', sign.keyword)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'primary.main',
                          color: 'white',
                        }
                      }}
                    />
                    <Chip
                      label="Image"
                      variant="outlined"
                      size="small"
                      onClick={() => handleMediaView(sign.imageUrl, 'image', sign.keyword)}
                      sx={{
                        cursor: 'pointer',
                        '&:hover': {
                          backgroundColor: 'secondary.main',
                          color: 'white',
                        }
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Media Modal with Fixed Dimensions */}
      <Dialog
        open={!!selectedMedia}
        onClose={handleCloseMedia}
        sx={{
          '& .MuiDialog-paper': {
            width: MODAL_WIDTH,
            height: MODAL_HEIGHT,
            maxWidth: 'none',
            maxHeight: 'none',
            borderRadius: 3,
            overflow: 'hidden'
          }
        }}
      >
        <AppBar 
          position="relative" 
          sx={{ 
            backgroundColor: 'primary.main',
            pr: 2
          }}
        >
          <Toolbar variant="dense">
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} noWrap>
              {selectedMedia?.title} - {selectedMedia?.type === 'video' ? 'Video' : 'Image'}
            </Typography>
            <IconButton edge="end" color="inherit" onClick={handleCloseMedia}>
              <CloseIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <DialogContent sx={{ 
          p: 0, 
          backgroundColor: 'black',
          width: MODAL_WIDTH,
          height: MODAL_HEIGHT - 64, // Subtract toolbar height
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          {selectedMedia && (
            <Box sx={{ 
              width: '100%', 
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {selectedMedia.type === 'video' ? (
                <video
                  controls
                  autoPlay
                  muted={mutedVideos.has(selectedMedia.url)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain',
                    outline: 'none'
                  }}
                >
                  <source src={selectedMedia.url} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ) : (
                <img
                  src={selectedMedia.url}
                  alt={selectedMedia.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'contain'
                  }}
                />
              )}
            </Box>
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default ViewAllSigns;