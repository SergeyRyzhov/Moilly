var env = process.env;

var app = require('../index');
var debug = require('debug')('moilly:server');
var http = require('http');

var port = normalizePort(env.PORT || '3000');
app.set('port', port);

/*var jwt = require('express-jwt');
var jwtmidlware = jwt({
  secret: new Buffer(env.JWTSECRET, 'base64'),
  getToken: function (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'authtoken') {
      return req.headers.authorization.split(' ')[1];
    } else if (req.query && req.query.token) {
      return req.query.token;
    }
    return null;
  }
});


app.get('/auth/2',
  jwtmidlware,
  function (req, res) {
    if (!req.user.admin) return res.sendStatus(401);
    res.sendStatus(200);
  });*/

var server = http.createServer(app);

server.listen(port);
server.on('error', onError);
server.on('listening', onListening);

function normalizePort(val) {
  var port = parseInt(val, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  var bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  var addr = server.address();
  var bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port;
  debug('Listening on ' + bind);
}
