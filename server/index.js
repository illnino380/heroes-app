/* eslint-disable import/extensions */
/* eslint-disable no-console */
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import { heroFormValidation } from './validations/heroForm.js';

import * as HeroController from './controllers/HeroController.js';

mongoose.connect(
  'mongodb+srv://yevhen:helloYevhen@cluster0.fhbfqck.mongodb.net/heroes?retryWrites=true&w=majority',
)
  .then(() => console.log('DB ok'))
  .catch((err) => console.log('DB error', err));

const app = express();

app.use(express.json());
app.use(cors());

app.get('/heroes', HeroController.getAll);
app.post('/heroes', heroFormValidation, HeroController.create);
app.patch('/heroes/:id', HeroController.update);
app.delete('/heroes/:id', HeroController.remove);

app.listen(4444, (err) => {
  if (err) {
    return console.log(err);
  }

  return console.log('Server OK');
});
