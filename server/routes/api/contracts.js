const express = require('express');
const router = express.Router();
const { getContractData, getContractDataAll } = require('../../controllers/smartContract');

router.get('/data/:method', async (req, res) => {
  try {
    const data = await getContractData(req, res, req.params.method);
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching contract data');
  }
});
router.get('/data/', async (req, res) => {
    try {
      const data = await getContractDataAll(req, res);
      res.json(data);
    } catch (error) {
      console.error(error);
      res.status(500).send('Error fetching contract data');
    }
  });

module.exports = router;
