const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** GET (DISCOVER) ROUTE **/
router.get('/', (req, res) => {
  const user = req.user.id;
  const queryText = `SELECT * FROM "watch" WHERE "rating" = 5 ORDER BY RANDOM() LIMIT 3`;

  pool
    .query(queryText)
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
