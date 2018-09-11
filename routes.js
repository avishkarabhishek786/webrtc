const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'WebRTC APP'
    })
})

router.get('/rtcpeerconnection', (req, res)=>{
    res.render('rtcpeerconnection.ejs', {
        data: {},
        errors: {},
        title: 'WebRTC APP'
    })
})
router.get('/peerjs', (req, res)=>{
    res.render('peerjs.ejs', {
        data: {},
        errors: {},
        title: 'Peer JS'
    })
})

module.exports = router