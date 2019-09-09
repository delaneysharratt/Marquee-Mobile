const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

//for accessing TMDB API key from .env//
require('dotenv').config();

/** GET ROUTE **/
router.get('/:searchTerm', (req, res) => {
  searchTerm = req.params.searchTerm;
  console.log('THIS THE SEARCH TERM SERVER SIDE', searchTerm);

  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${searchTerm}&page=1`
    )
    .then(response => {
      console.log(response.data.results);
      res.send(response.data.results);
    })
    .catch(err => {
      console.log(err);
    });
});

/** POST ROUTE **/
router.post('/', (req, res) => {});

module.exports = router;
