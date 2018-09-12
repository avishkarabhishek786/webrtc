const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'WebRTC APP'
    })
})

router.get('/ready', function (req, res) {
    console.log("ready");

})

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('connected!');

        socket.on('disconnect', () => {
            console.log('Disconnected to client!');
        });

        socket.on('ready', (params, callback) => {
        
            socket.join(params)
            // socket.emit runs function for current user and not for rest users
            socket.broadcast.to(params).emit('announce', {message: 'New client in the '+params+' room joined.'})
        
        })

        socket.on('send', (params, callback)=>{
            io.to(params.room).emit('message', {
                message: params.message,
                author: params.author
            })
        })

    })

    return router;
}