const express = require('express')
const app = express()
const http = require('http').Server(app);
const io = require('socket.io')(http)
const fs = require('fs');
var dateFormat = require('dateformat');

app.set('view engine', 'ejs')
app.use(express.static('static'))

app.get('/', function(req, res) {
    res.render('index.ejs')
})

io.on('connection', function(socket) {
  console.log('New connection')
  socket.on('new_message', function(message) {
    console.log('New message '+message);
    if (message != "summary" && message != "drop") {
      fs.appendFile('messages.txt', dateFormat(Date.now(), "yyyy-mm-dd h:MM:ss") + ": " + message +"\n", 'utf8', function(err){
        if (err) throw err;
        console.log(message + 'save in file');
      });
    }
    if (message == "summary") {
      fs.readFile('messages.txt','utf8', function(err, data){
        if (err) throw err;
        socket.emit('summary',data);
      })
      
    }
    if (message == "drop") {
      fs.writeFile('messages.txt','','utf8', function(err){
        if (err) throw err;
        console.log('drop messages');
        socket.emit('drop');
      })
    }
  });
})

const server = http.listen(8080, function() {
  console.log('listening on *:8080');
});