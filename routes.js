const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
    res.render('index.ejs', {
        data: {},
        errors: {},
        title: 'WebRTC APP'
    })
})


module.exports = router