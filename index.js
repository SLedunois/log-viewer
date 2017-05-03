var express = require('express');
var app = express();

var socketIO = require('socket.io');
var connectionManager = require('./utils/connectionManager');

var fs = require('fs');
var fileUtils = require('./utils/fileUtils');
var configuration = require('./configuration.json');

var routes = require('./routes/index');

app.use(express.static(__dirname + '/public'));
app.use('/', routes);

var server = require('http').Server(app);

if (configuration.hasOwnProperty('file')) {
  var path = fileUtils.getConfigurationFilePath();
  if (fs.existsSync(path)) {

  } else {
    throw new Error(path + ' file doest not exists');
  }

  server.listen(3000, function  () {
    console.log('listening on *:3000');
    var io = socketIO(server);
    io.on('connection', function (socket) {
      connectionManager.initConnection(socket);
    });
  });

} else {
  throw new Error('Configuration file does not contains files properties');
}

