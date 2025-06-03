import React from 'react';
import { Card, CardContent, CardMedia, Typography, IconButton, Box } from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useFavorites } from '../../contexts/FavoritesContext';
import { Plant } from '../../types/plant';
import PlantActions from './PlantActions';

interface PlantCardProps {
  plant: Plant;
  onViewDetails: (id: number) => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ plant, onViewDetails }) => {
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite(plant.id)) {
      removeFromFavorites(plant.id);
    } else {
      addToFavorites(plant);
    }
  };

  const getImageUrl = (filename: string | undefined) => {
    if (!filename) return '/placeholder-plant.jpg';
    return `http://127.0.0.1:5000/uploads/${filename}`;
  };
  
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={() => onViewDetails(plant.id)}
    >
      <Box sx={{ position: 'relative', paddingTop: '75%' }}>
        <CardMedia
          component="img"
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
          image={getImageUrl(plant.image_filename)}
          alt={plant.name}
        />
      </Box>
      <CardContent sx={{ 
        flexGrow: 1, 
        position: 'relative',
        padding: '16px !important',
        '&:last-child': {
          paddingBottom: '16px !important',
        }
      }}>
        <IconButton
          onClick={handleFavoriteClick}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
            },
          }}
        >
          {isFavorite(plant.id) ? (
            <FavoriteIcon sx={{ color: 'error.main' }} />
          ) : (
            <FavoriteBorderIcon />
          )}
        </IconButton>
        <Typography 
          gutterBottom 
          variant="h6" 
          component="div"
          sx={{
            fontSize: '1.1rem',
            fontWeight: 600,
            marginBottom: '4px',
            paddingRight: '32px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {plant.name}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {plant.scientific_name}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default PlantCard; 