const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET (QUEUE) ROUTE **/
router.get('/queue', (req, res) => {
  const user = req.user.id;
  const queryText = `SELECT * FROM "watch" WHERE "user_id" = $1 
                     ORDER BY "completed" ASC, "date_updated" DESC`;

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
  const queryText = `SELECT * FROM "watch" WHERE "user_id" = $1 AND "completed" = true 
                    ORDER BY CASE WHEN "rating" = 0 THEN 0 ELSE 1 END, "rating" DESC`;
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
  const time = `DATE_TRUNC('minute', NOW())`;
  const user = req.user.id;

  const queryText = `INSERT INTO "watch" ("title", "poster", "backdrop", "date_updated", "user_id")
                    VALUES ($1, $2, $3, DATE_TRUNC('minute', NOW()), $4)`;
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

/** PUT (PRIORITY) ROUTE **/
router.put('/priority/:id', (req, res) => {
  console.log('Updating priority status...');
  const rating = req.body.priority;
  const idToUpdate = req.params.id;

  const queryText = `UPDATE "watch" SET "priority" = $1 WHERE "id" = $2`;
  pool
    .query(queryText, [rating, idToUpdate])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router PUT (priority):', err);
      res.sendStatus(500);
    });
});

/** PUT (COMPLETED) ROUTE **/
router.put('/completed/:id', (req, res) => {
  console.log('Updating watch status...');
  const idToUpdate = req.params.id;

  const queryText = `UPDATE "watch" SET "completed" = NOT "completed", 
                    "date_updated" = DATE_TRUNC('minute', NOW()) WHERE "id" = $1`;
  pool
    .query(queryText, [idToUpdate])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router PUT (completed):', err);
      res.sendStatus(500);
    });
});

/** PUT (RATING) ROUTE **/
router.put('/rating/:id', (req, res) => {
  console.log('Updating watch rating...');
  const rating = req.body.rating;
  const idToUpdate = req.params.id;

  const queryText = `UPDATE "watch" SET "rating" = $1 WHERE "id" = $2`;
  pool
    .query(queryText, [rating, idToUpdate])
    .then(() => {
      res.sendStatus(201);
    })
    .catch(err => {
      console.log('Error in watch router PUT (rating):', err);
      res.sendStatus(500);
    });
});

module.exports = router;
