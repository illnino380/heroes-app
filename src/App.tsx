import React, { useEffect } from 'react';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { useAppDispatch } from './app/hooks';
import { HeroDetails } from './components/HeroDetails';
import { HeroesList } from './components/HeroesList';
import { HeroForm } from './components/HeroForm';
import { PageNotFound } from './components/PageNotFound';
import { fetchHeroes } from './features/HeroSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchHeroes());
  }, []);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HeroesList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/hero/:heroId" element={<HeroDetails />} />
        <Route path="/hero/edit">
          <Route index element={<HeroForm />} />
          <Route path=":heroId" element={<HeroForm />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
};
