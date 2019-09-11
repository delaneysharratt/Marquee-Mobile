const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET ROUTE **/
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
      console.log('Error in friend router GET:', err);
      res.sendStatus(500);
    });
});

module.exports = router;
