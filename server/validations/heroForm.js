import { body } from 'express-validator';

export const heroFormValidation = [
  body('nickname', 'nickname length should be min 2 chars').isLength({ min: 3 }),
  body('real_name', 'real name length should be min 3 chars').isLength({ min: 3 }),
  body('origin_description', 'original description length should be min 5 chars').isLength({ min: 3 }),
  body('superpowers', 'superpowers length should be min 5 chars').isLength({ min: 3 }),
  body('catch_phrase', 'catch phrase length should be min 5 chars').isLength({ min: 3 }),
  body('images', 'use correct image URL').isArray().isURL().optional(),
];
