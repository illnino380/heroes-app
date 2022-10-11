/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Hero } from '../../types/Hero';

interface Props {
  hero: Hero,
}

export const HeroItem: React.FC<Props> = (props) => {
  const { hero } = props;

  const navigate = useNavigate();

  const handleLearnMoreButton = () => {
    navigate(`/hero/${hero._id}`);
  };

  return (
    <Card sx={{
      width: 200,
      mb: '10px',
      display: 'flex',
      flexDirection: 'column',
    }}
    >
      <CardMedia
        component="img"
        height="200"
        image={hero.images[0]}
        alt={hero.nickname}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {hero.nickname}
        </Typography>
      </CardContent>
      <CardActions sx={{
        mt: 'auto',
      }}
      >
        <Button
          size="small"
          onClick={handleLearnMoreButton}
        >
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};
