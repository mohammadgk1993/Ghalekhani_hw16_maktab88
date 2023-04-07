const express = require("express");
const router = express.Router();
const product = require("../models/product");
const {documentFinder , documentMaxFinder, documentLengthFinder, documentUpdater, documentRemover} = require('../controllers/functions')


router.post('/', documentFinder)

router.patch('/' , documentUpdater)

router.delete('/' , documentRemover)

router.post('/max', documentMaxFinder)

router.post('/length', documentLengthFinder)

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;