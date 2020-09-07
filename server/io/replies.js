const { Reply } = require('../models/reply');

module.exports = (io) => {
    io.sockets.on('connection', socket => {
        socket.on('reply', (data) => reply(data, io));
    });
}

async function reply(data, io) {
    let _reply = await Reply(new Date()).findOne({ user: data.user }).exec();
    if (_reply) {
        await _reply.update({
            reply: data.reply
        });
    } else {
        await Reply(new Date()).create({
            user: data.user,
            reply: data.reply
        });
    }
}

