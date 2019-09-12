const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET (FRIEND LIST) ROUTE **/
router.get('/', (req, res) => {
  const user = req.user.id;
  const queryText = `
  SELECT "user_id", "friend_id", "user".username FROM "friend"
  JOIN "user" ON "user".id = "friend".friend_id WHERE "user_id" = $1
  `;

  pool
    .query(queryText, [user])
    .then(result => {
      console.log('User friends:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in friend router GET (friend list):', err);
      res.sendStatus(500);
    });
});

/** GET (FRIEND SEARCH) ROUTE **/
router.get('/search/:username', (req, res) => {
  const friend = req.params.username + '%';
  console.log(friend);

  const queryText = `
  SELECT "username" FROM "user" WHERE "username" LIKE $1
  `;

  pool
    .query(queryText, [friend])
    .then(result => {
      console.log('Friend search results:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in friend router GET (friend search):', err);
      res.sendStatus(500);
    });
});

/** GET (FRIEND PROFILE) ROUTE **/
router.get('/:username', (req, res) => {
  const friend = req.params.username;
  console.log(friend);

  const queryText = `
  SELECT "user".username, "user_id", "title", "poster", "rating" FROM "watch"
  JOIN "user" ON "user".id = "watch".user_id
  WHERE "username" = $1 AND "completed" = true
  ORDER BY "rating" DESC;
  `;

  pool
    .query(queryText, [friend])
    .then(result => {
      console.log('Friend watches:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in friend router GET (friend profile):', err);
      res.sendStatus(500);
    });
});

module.exports = router;
