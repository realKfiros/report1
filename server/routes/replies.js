const { Router } = require('express');
const { Reply } = require('../models/reply');
const router = Router();

router.get('/today', async (req, res) => {
    try {
        let reply = await Reply(new Date()).findOne({ user: req.query.user }).exec();
        res.send(reply);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

module.exports = router;