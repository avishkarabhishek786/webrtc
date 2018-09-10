const path = require('path');
const express = require('express');

const routes = require('./routes')

const port = process.env.PORT || 3008

const app = express()

app.set('view engine', 'ejs')

const middleware = [
    express.static(path.join(__dirname+'public'))
]

app.use(middleware)

app.use('/', routes);

app.use((req, res,next)=>{
  res.status(404).send("Page Not Found");
});

app.use((err, req, res, next)=>{
  console.log(err);
  res.status(500).send("Page Broke!");
});

app.listen(port, ()=>{
  console.log(`WebRTC application running on port ${port}`);
});