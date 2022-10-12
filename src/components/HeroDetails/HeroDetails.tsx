/* eslint-disable no-underscore-dangle */
import {
  Button,
  Card, CardActions, CardContent, CardMedia, Container, ImageList, ImageListItem, Typography,
} from '@mui/material';
import { v4 as uuidv4 } from 'uuid';
import ClearIcon from '@mui/icons-material/Clear';
import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { heroesSelector } from '../../app/store';
import { Hero } from '../../types/Hero';
import { removeHeroById, updateHeroById } from '../../features/HeroSlice';
import { Loader } from '../Loader';

export const HeroDetails: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { heroes } = useAppSelector(heroesSelector);
  const { heroId } = useParams();
  const [heroimages, setHeroImages] = useState<string[]>([]);

  const selectedHero = useMemo(() => {
    return heroes.find((hero: Hero) => hero._id === heroId);
  }, [heroes]);

  useEffect(() => {
    if (selectedHero) {
      setHeroImages(selectedHero.images);
    }
  }, [selectedHero?.images]);

  const handleDeleteImage = (imgUrl: string) => {
    if (selectedHero) {
      const updatedHeroImages = selectedHero.images.filter(image => (
        image !== imgUrl
      ));

      const updatedHero = {
        ...selectedHero,
        images: updatedHeroImages,
      };

      dispatch(updateHeroById(updatedHero));
    }
  };

  return (
    <>
      {selectedHero
        ? (
          <Container sx={{
            display: 'grid',
            my: 4,
          }}
          >
            <Card sx={{ maxWidth: 500, placeSelf: 'center' }}>
              <CardMedia
                component="img"
                alt={selectedHero.nickname}
                height="400"
                image={selectedHero?.images[0] || 'quotation.jpg'}
                sx={{ objectFit: 'contain' }}
              />
              <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
              }}
              >
                <Typography gutterBottom variant="h5" component="div">
                  {selectedHero.nickname}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Real name: ${selectedHero.real_name}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Origin description: ${selectedHero.origin_description}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Super powers: ${selectedHero.superpowers}`}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {`Catch phrase: ${selectedHero.catch_phrase}`}
                </Typography>
                <Typography>Images</Typography>
                <ImageList sx={{ width: '100%', height: '100%' }} cols={3}>
                  {heroimages.map((image) => (
                    <ImageListItem
                      sx={{ display: 'flex' }}
                      key={uuidv4()}
                    >
                      <img
                        src={`${image}?w=164&h=164&fit=crop&auto=format`}
                        alt={selectedHero.nickname}
                      />
                      <Button onClick={() => handleDeleteImage(image)}>
                        <ClearIcon />
                      </Button>
                    </ImageListItem>
                  ))}
                </ImageList>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => (
                    navigate(`/hero/edit/${selectedHero._id}`))}
                >
                  Edit
                </Button>

                <Button
                  size="small"
                  onClick={() => {
                    dispatch(removeHeroById(selectedHero._id));
                    navigate('/');
                  }}
                >
                  Delete
                </Button>

                <Button
                  size="small"
                  onClick={() => {
                    navigate('/');
                  }}
                >
                  Back to main list
                </Button>
              </CardActions>
            </Card>
          </Container>
        ) : (
          <Loader />
        )}
    </>
  );
};
