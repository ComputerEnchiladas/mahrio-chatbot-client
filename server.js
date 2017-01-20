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

  socket.emit('event:camera:mode', 'photo');
  socket.on('event:take:action', function(){
    io.sockets.emit('event:take:action');
  });
  socket.on('event:camera:done', function(uri){
    console.log('Camera done');
    console.log( uri );
    io.sockets.emit('event:camera:done', uri );
  });
});

console.log('listening');
server.listen( 8080, '192.168.0.8');
