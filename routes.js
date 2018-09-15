const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'WebRTC APP'
    })
})

router.get('/webcam', function (req, res) {
    
    res.render('webcam.ejs', {
        data: {},
        errors: {},
        title: 'Webcam'
    })
    
})

module.exports = function (io) {
    io.on('connection', function (socket) {
        console.log('connected!');

        socket.on('disconnect', () => {
            console.log('Disconnected to client!');
        });

        socket.on('ready', (params, callback) => {
        
            socket.join(params.chat_room)
            socket.join(params.signal_room)
            // socket.emit runs function for current user and not for rest users
            socket.broadcast.to(params).emit('announce', {message: 'New client in the '+params+' room joined.'})
            console.log("ready...");
        })

        socket.on('send', (params, callback)=>{
            io.to(params.room).emit('message', {
                message: params.message,
                author: params.author
            })
        })

        socket.on('signal', (params)=>{
            socket.broadcast.to(params.room).emit('signalling_message', {
                type: params.type,
                message: params.message
            })
            console.log("signal....");
        })

    })

    return router;
}