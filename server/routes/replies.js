const { Router } = require('express');
const { Reply } = require('../models/reply');
const { Group } = require('../models/group');
const { ReplyType } = require('../models/replyType');
const router = Router();

router.get('/:day-:month-:year', async (req, res) => {
    try {
        let date = new Date();
        date.setDate(req.params.day);
        date.setMonth(req.params.month - 1);
        date.setFullYear(req.params.year);
        let reply = await Reply(date).findOne({
            user: req.query.user
        }).exec();
        res.send(reply);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
})

router.get('/types', async (req, res) => {
    try {
        let group = await Group.findOne({
            users: {
                $in: [req.query.user]
            }
        }).exec();
        let replyTypes = await ReplyType.find({
            group: group.get('key')
        }).exec();
        res.send(replyTypes);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

router.get('/today', async (req, res) => {
    try {
        let reply = await Reply(new Date()).findOne({ user: req.query.user }).exec();
        res.send(reply);
    } catch (err) {
        console.log(err);
        res.sendStatus(500);
    }
});

module.exports = router;