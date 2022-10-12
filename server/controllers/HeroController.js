/* eslint-disable consistent-return */
/* eslint-disable import/extensions */
/* eslint-disable no-console */
import { validationResult } from 'express-validator';
import HeroModel from '../models/Hero.js';

export const getAll = async (req, res) => {
  try {
    const heroes = await HeroModel.find();

    res.json(heroes);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Cannot get heroes',
    });
  }
};

export const create = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json(errors.array());
    }

    const document = new HeroModel({
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      images: req.body.images,
    });

    const hero = await document.save();

    res.json(hero);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'The hero real name is used',
    });
  }
};

export const remove = async (req, res) => {
  try {
    const heroId = req.params.id;

    HeroModel.findOneAndDelete({
      _id: heroId,
    }, (err, doc) => {
      if (err) {
        console.log(err);

        return res.status(500).json({
          message: 'Cannot remove hero',
        });
      }

      if (!doc) {
        return res.status(404).json({
          message: 'Hero not found',
        });
      }

      res.json({
        success: true,
      });
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Cannot get heroes',
    });
  }
};

export const update = async (req, res) => {
  try {
    const heroId = req.params.id;

    const document = {
      _id: heroId,
      nickname: req.body.nickname,
      real_name: req.body.real_name,
      origin_description: req.body.origin_description,
      superpowers: req.body.superpowers,
      catch_phrase: req.body.catch_phrase,
      images: req.body.images,
    };

    await HeroModel.updateOne(
      {
        _id: heroId,
      },
      {
        nickname: req.body.nickname,
        real_name: req.body.real_name,
        origin_description: req.body.origin_description,
        superpowers: req.body.superpowers,
        catch_phrase: req.body.catch_phrase,
        images: req.body.images,
      },
    );

    res.json(document);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: 'Cannot update hero',
    });
  }
};
