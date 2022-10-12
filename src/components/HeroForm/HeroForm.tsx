/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
import * as React from 'react';
import { Button, TextField } from '@mui/material';
import { FormEvent, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { addNewHero, updateHeroById } from '../../features/HeroSlice';

const defaultHero = {
  nickname: '',
  real_name: '',
  origin_description: '',
  superpowers: '',
  catch_phrase: '',
  images: [] as string[],
};

export const HeroForm: React.FC = () => {
  const { heroId = 0 } = useParams();

  const heroState = useAppSelector(state => (
    state.heroesState.heroes.find(hero => hero._id === heroId) || defaultHero
  ));

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [hero, setHero] = useState(heroState);
  const [errorMessage, setErrorMessage] = useState('');

  const isValidTextInput = (value: string, num: number) => {
    if (value.length < num) {
      setErrorMessage(`Input text field should contain more than ${num} characters and should be valid`);

      return false;
    }

    return true;
  };

  const handleNewHeroData = (field: string, value: string) => {
    setErrorMessage('');

    if (field !== 'images') {
      setHero(prevState => ({
        ...prevState,
        [field]: value,
      }));
    }

    if (field === 'images') {
      const newImages = value.split(',');

      setHero(prevState => ({
        ...prevState,
        [field]: newImages,
      }));
    }
  };

  const isValidForm = () => {
    return (
      isValidTextInput(hero.nickname, 2)
        && isValidTextInput(hero.real_name, 3)
        && isValidTextInput(hero.origin_description, 5)
        && isValidTextInput(hero.superpowers, 5)
        && isValidTextInput(hero.catch_phrase, 5)
    );
  };

  const handleAddNewHero = (event: FormEvent) => {
    event.preventDefault();

    if (!isValidForm()) {
      return;
    }

    if (heroId) {
      dispatch(updateHeroById({
        ...hero,
        _id: heroId,
      }));
    } else {
      dispatch(addNewHero(hero));
    }

    navigate('/');
  };

  return (
    <form
      style={{
        display: 'grid',
        margin: '30px',
        gap: '20px',
      }}
      onSubmit={handleAddNewHero}
    >

      <TextField
        sx={{ placeSelf: 'center' }}
        id="image-input"
        label="Images"
        type="text"
        placeholder="Image URL"
        value={hero.images.join(', ')}
        onChange={(event) => (
          handleNewHeroData('images', event.target.value)
        )}
      />
      <TextField
        sx={{ placeSelf: 'center' }}
        id="NickName-input"
        type="text"
        placeholder="NickName"
        value={hero.nickname}
        onChange={(event) => (
          handleNewHeroData('nickname', event.target.value)
        )}
        required
      />
      <TextField
        sx={{ placeSelf: 'center' }}
        id="Real-Name-input"
        type="text"
        placeholder="Real Name"
        value={hero.real_name}
        onChange={(event) => (
          handleNewHeroData('real_name', event.target.value)
        )}
        required
      />
      <TextField
        sx={{ placeSelf: 'center' }}
        id="Origin-description-input"
        type="text"
        placeholder="Origin description"
        value={hero.origin_description}
        onChange={(event) => (
          handleNewHeroData('origin_description', event.target.value)
        )}
        required
      />
      <TextField
        sx={{ placeSelf: 'center' }}
        id="Superpowers-input"
        type="text"
        placeholder="Superpowers"
        value={hero.superpowers}
        onChange={(event) => (
          handleNewHeroData('superpowers', event.target.value)
        )}
        required
      />
      <TextField
        sx={{ placeSelf: 'center' }}
        id="Catch-phrase-input"
        type="text"
        placeholder="Catch phrase"
        value={hero.catch_phrase}
        onChange={(event) => (
          handleNewHeroData('catch_phrase', event.target.value)
        )}
        required
      />

      <Button
        type="submit"
        disabled={
          !hero.catch_phrase
          || !hero.nickname
          || !hero.origin_description
          || !hero.real_name
        }
      >
        {heroId ? 'Edit hero' : 'Add hero'}
      </Button>

      <Button
        type="button"
        onClick={() => navigate('/')}
      >
        Cancel
      </Button>
    </form>

  );
};
