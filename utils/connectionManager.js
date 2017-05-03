var fileUtils = require('./fileUtils');
var tail = require('tail').Tail;

module.exports = {
  initConnection: function (socket) {
    fileUtils.getFile(fileUtils.getConfigurationFilePath(), function (fileContent) {
      socket.emit('file:content', fileContent);
      (fileUtils.initTail()).on('line', function (data) {
        socket.emit('file:newline', data);
      }).on('error', function (err) {
        console.log(err);
      });
    });
  }
};