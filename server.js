var http = require('http')
  , server = http.createServer( handler )
  , io = require('socket.io')( server );

function handler( request, reply ) {
  reply.writeHead(200);
  reply.write("<script type='text/javascript' src='https://cdn.socket.io/socket.io-1.0.0.js'></script>");
  reply.end('Running!');
}

io.on('connection', function( socket ) {
  console.log('Client connected.');

  socket.emit('event:take:action');
});

console.log('listening');
server.listen( 8080, '127.0.0.1');