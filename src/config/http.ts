import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://api.foursquare.com/v3/places',
  timeout: 10000,
  headers: {
    Authorization: 'fsq3Wy3+RUvdvcRLm4DkXbqHwQjIUUjaZcaQNxBWYjuZGhE=',
  },
});
