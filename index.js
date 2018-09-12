const path = require('path');
const http = require('http')
const express = require('express');
const socketIO = require('socket.io')

const port = process.env.PORT || 3008

const app = express()
app.io = socketIO();
const server = http.createServer(app);
app.io.attach(server);

const routes = require('./routes')(app.io)

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

server.listen(port, ()=>{
  console.log(`WebRTC application running on port ${port}`);
});