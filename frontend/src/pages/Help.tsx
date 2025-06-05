import React from 'react';
import {
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Box,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import SearchIcon from '@mui/icons-material/Search';
import FavoriteIcon from '@mui/icons-material/Favorite';
import InfoIcon from '@mui/icons-material/Info';

const Help: React.FC = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography 
        variant="h4" 
        component="h1" 
        gutterBottom 
        sx={{ 
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 600,
          color: '#2E7D32',
          mb: 4
        }}
      >
        Help Center
      </Typography>

      <Paper 
        sx={{ 
          p: 3, 
          mb: 4,
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
        }}
      >
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            color: '#2E7D32',
            mb: 2
          }}
        >
          Usage Guide
        </Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <PhotoCameraIcon sx={{ color: '#2E7D32' }} />
            </ListItemIcon>
            <ListItemText
              primary="Plant Identification"
              secondary="Click the 'Identify' button on the side menu and click the image icon to upload an image from your gallery. The system will identify the plant and show the results."
              primaryTypographyProps={{
                sx: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <SearchIcon sx={{ color: '#2E7D32' }} />
            </ListItemIcon>
            <ListItemText
              primary="Plant Search"
              secondary="Use the search bar to search for plants by name or scientific name. Results will be listed instantly."
              primaryTypographyProps={{
                sx: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 }
              }}
            />
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <FavoriteIcon sx={{ color: '#2E7D32' }} />
            </ListItemIcon>
            <ListItemText
              primary="Favorites"
              secondary="You can add plants you like to your favorites. A maximum of 3 plants can be added to favorites. Your favorites are displayed in the left menu."
              primaryTypographyProps={{
                sx: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 }
              }}
            />
          </ListItem>
        </List>
      </Paper>

      <Typography 
        variant="h5" 
        gutterBottom
        sx={{ 
          fontFamily: 'Poppins, sans-serif',
          fontWeight: 500,
          color: '#2E7D32',
          mb: 2
        }}
      >
        Frequently Asked Questions
      </Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Accordion 
          sx={{ 
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&.Mui-expanded': {
              margin: '8px 0',
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#2E7D32' }} />}
            sx={{
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.04)'
              }
            }}
          >
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              How does plant identification work?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
              The system uses an AI-powered image recognition model to analyze plant photos. 
              After taking or uploading a photo, the model identifies the plant and shows the most likely matches.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion 
          sx={{ 
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&.Mui-expanded': {
              margin: '8px 0',
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#2E7D32' }} />}
            sx={{
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.04)'
              }
            }}
          >
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              Which plant species can be identified?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
              The system can currently identify over 1,000 common plant species. Our database is continuously updated 
              with new species. For best results, we recommend taking a clear, well-lit photo of the plant.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion 
          sx={{ 
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&.Mui-expanded': {
              margin: '8px 0',
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#2E7D32' }} />}
            sx={{
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.04)'
              }
            }}
          >
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              Why can I only add 3 plants to favorites?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
              This limitation helps users focus on their most interested plants. 
              This limit may be increased in future updates.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion 
          sx={{ 
            borderRadius: '12px !important',
            '&:before': { display: 'none' },
            boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
            '&.Mui-expanded': {
              margin: '8px 0',
            }
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon sx={{ color: '#2E7D32' }} />}
            sx={{
              borderRadius: '12px',
              '&:hover': {
                backgroundColor: 'rgba(46, 125, 50, 0.04)'
              }
            }}
          >
            <Typography sx={{ fontFamily: 'Poppins, sans-serif', fontWeight: 500 }}>
              Where does the plant information come from?
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
              Plant information is generated using advanced AI technology. Our system analyzes plant characteristics 
              and provides detailed information about each plant, including its scientific name, common name, 
              family, and basic features.
            </Typography>
          </AccordionDetails>
        </Accordion>
      </Box>

      <Box sx={{ mt: 4 }}>
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{ 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            color: '#2E7D32',
            mb: 2
          }}
        >
          API References
        </Typography>
        <Paper 
          sx={{ 
            p: 3,
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
          }}
        >
          <List>
            <ListItem>
              <ListItemIcon>
                <InfoIcon sx={{ color: '#2E7D32' }} />
              </ListItemIcon>
              <ListItemText
                primary="Plant.id API"
                secondary="Used for plant identification and information. https://plant.id/"
                primaryTypographyProps={{
                  sx: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 }
                }}
              />
            </ListItem>
            <Divider />
            <ListItem>
              <ListItemIcon>
                <InfoIcon sx={{ color: '#2E7D32' }} />
              </ListItemIcon>
              <ListItemText
                primary="OpenAI API"
                secondary="Used for generating detailed plant care instructions and information. https://openai.com/"
                primaryTypographyProps={{
                  sx: { fontFamily: 'Poppins, sans-serif', fontWeight: 500 }
                }}
              />
            </ListItem>
          </List>
        </Paper>
      </Box>

      <Box sx={{ mt: 4, textAlign: 'center' }}>
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontFamily: 'Poppins, sans-serif',
            fontWeight: 500,
            color: '#2E7D32'
          }}
        >
          Have More Questions?
        </Typography>
        <Typography sx={{ fontFamily: 'Poppins, sans-serif' }}>
          If you have any questions that are not answered here, please check our documentation or submit an issue on our GitHub repository.
        </Typography>
      </Box>
    </Container>
  );
};

export default Help; 