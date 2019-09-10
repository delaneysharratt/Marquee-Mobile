const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();
const axios = require('axios');

/** GET (QUEUE) ROUTE **/
router.get('/', (req, res) => {
  const user = req.user.id;
  const queryText = `SELECT * FROM "watch" WHERE "user_id" = $1 
                     ORDER BY "completed" ASC`;

  pool
    .query(queryText, [user])
    .then(result => {
      console.log('User watches:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in watch router GET (Queue):', err);
      res.sendStatus(500);
    });
});

/** GET (PROFILE) ROUTE **/
router.get('/profile', (req, res) => {
  const user = req.user.id;
  const queryText = `SELECT * FROM "watch" WHERE "user_id" = $1 
                    AND "completed" = true ORDER BY "rating" DESC`;
  pool
    .query(queryText, [user])
    .then(result => {
      console.log('User Profile:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in watch router GET (Profile):', err);
      res.sendStatus(500);
    });
});

/** POST ROUTE **/
router.post('/', (req, res) => {
  console.log('Adding new watch:', req.body);
  const title = req.body.title;
  const poster = req.body.poster;
  const backdrop = req.body.backdrop;
  const user = req.user.id;

  const queryText = `INSERT INTO "watch" ("title", "poster", "backdrop", "user_id")
                    VALUES ($1, $2, $3, $4)`;
  pool
    .query(queryText, [title, poster, backdrop, user])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router POST:', err);
      res.sendStatus(500);
    });
});

/** DELETE ROUTE **/
router.delete('/:id', (req, res) => {
  console.log('Deleting watch...');
  const idToUpdate = req.params.id;

  const queryText = `DELETE FROM "watch" WHERE "id" = $1`;
  pool
    .query(queryText, [idToUpdate])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router DELETE:', err);
      res.sendStatus(500);
    });
});

/** PUT ROUTE **/
router.put('/:id', (req, res) => {
  console.log('Updating watch completion...');
  const idToUpdate = req.params.id;

  const queryText = `UPDATE "watch" SET "completed" = NOT "completed" WHERE "id" = $1`;
  pool
    .query(queryText, [idToUpdate])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router PUT:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
