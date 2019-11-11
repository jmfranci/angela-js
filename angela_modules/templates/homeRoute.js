module.exports.tHomeRoute = `
const express = require('express');
const router = express.Router();

router.get('/', (req,res) => {
	res.send('<h1>This is your Angela.js App </h1>');
});

module.exports = router;
`;
