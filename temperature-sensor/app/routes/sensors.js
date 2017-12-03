const express = require('express');

const router = express.Router();

/* GET sensor temperature given its ID. */
router.get('/:id/temperature', (req, res, next) => {
  res.json({ temperature: 0 });
});

/* GET users listing. */
router.get('/temperatures', (req, res, next) => {
  res.json({ temperatures: [] });
});

module.exports = router;
