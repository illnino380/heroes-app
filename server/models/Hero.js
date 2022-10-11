import mongoose from 'mongoose';

const HeroSchema = new mongoose.Schema({
  nickname: {
    type: String,
    required: true,
  },
  real_name: {
    type: String,
    required: true,
    unique: true,
  },
  origin_description: {
    type: String,
    required: true,
  },
  superpowers: {
    type: String,
    required: true,
  },
  catch_phrase: {
    type: String,
    required: true,
  },
  images: {
    type: Array,
    default: [],
  },
}, {
  timestamps: true,
});

export default mongoose.model('Hero', HeroSchema);
