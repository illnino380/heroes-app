import React from 'react';
import {
  HashRouter, Navigate, Route, Routes,
} from 'react-router-dom';
import './App.scss';
import { HeroesList } from './components/HeroesList';
import { HeroForm } from './components/HeroForm';
import { PageNotFound } from './components/PageNotFound';

export const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HeroesList />} />
        <Route path="home" element={<Navigate to="/" replace />} />
        <Route path="/hero/edit">
          <Route index element={<HeroForm />} />
          <Route path=":heroId" element={<HeroForm />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </HashRouter>
  );
};
