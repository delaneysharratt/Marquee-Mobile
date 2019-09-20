const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET (DISCOVER) ROUTE **/
router.get('/', (req, res) => {
  const user = req.user.id;
  const queryText = `SELECT "user".username, "watch".id, "user_id", 
                    "title", "poster", "backdrop", "rating" FROM "watch" 
                    JOIN "user" on "user".id = "watch".user_id 
                    WHERE "user_id" = ANY (SELECT "friend_id" 
                    FROM "friend" WHERE "user_id" = $1) AND 
                    "rating" >= 3 ORDER BY RANDOM(), "rating" LIMIT 3`;

  pool
    .query(queryText, [user])
    .then(result => {
      console.log('Discover recommendations:', result.rows);
      res.send(result.rows);
    })
    .catch(err => {
      console.log('Error in watch router GET (Discover):', err);
      res.sendStatus(500);
    });
});

module.exports = router;
