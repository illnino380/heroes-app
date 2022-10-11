/* eslint-disable no-underscore-dangle */
import { ThemeProvider } from '@emotion/react';
import {
  AppBar,
  Box,
  Button,
  Container,
  createTheme,
  CssBaseline,
  Grid,
  Pagination,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { heroesSelector } from '../../app/store';
import { fetchHeroes } from '../../features/HeroSlice';
import { HeroItem } from '../HeroItem';
import { Loader } from '../Loader';

export const HeroesList: React.FC = () => {
  const dispatch = useAppDispatch();

  const theme = createTheme();
  const navigate = useNavigate();

  const { heroes, status } = useAppSelector(heroesSelector);

  const heroesPerPage = 5;
  const pages = useMemo(() => {
    return Math.ceil(heroes.length / heroesPerPage);
  }, [heroes]);

  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = heroes.slice(indexOfFirstHero, indexOfLastHero);

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Heroes App
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Box
          sx={{
            bgcolor: 'background.paper',
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
            >
              Heroes List
            </Typography>
            <Typography variant="h5" align="center" color="text.secondary" paragraph>
              You can add a new hero
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              <Button
                variant="contained"
                onClick={() => navigate('/hero/edit')}
              >
                Add new hero
              </Button>
            </Stack>
          </Container>
        </Box>
        <Container
          sx={{
            py: 8,
          }}
          maxWidth="lg"
        >
          {status === 'loading' && <Loader />}

          {status === 'error' && <h2>Cannot load data</h2>}

          {status === 'loaded' && (
            <Grid
              container
              spacing={4}
              sx={{
                mr: 2,
                justifyContent: 'center',
                gap: '20px',
              }}
            >
              {currentHeroes.map((hero) => (
                <HeroItem hero={hero} key={hero._id} />
              ))}
            </Grid>
          )}
        </Container>
        <Container sx={{ display: 'grid' }}>
          <Pagination
            sx={{ placeSelf: 'center' }}
            count={pages}
            color="primary"
            onChange={(_, num) => setCurrentPage(num)}
          />
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Footer
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          Heroes App by Yevhen Nikolaienko
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          {'Copyright © '}
          <Link color="inherit" to="https://github.com/illnino380">
            Your Website
          </Link>
          {' '}
          {new Date().getFullYear()}
          .
        </Typography>
      </Box>
    </ThemeProvider>
  );
};
