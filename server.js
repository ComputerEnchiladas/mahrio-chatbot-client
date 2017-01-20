var http = require('http')
  , server = http.createServer( handler )
  , io = require('socket.io')( server )
  , fs = require('fs')
  , path = require('path')
  , indexHTML = '';

fs.readFile(path.resolve(__dirname,'client-web.html'), function(err, data){
  indexHTML = data;
});

function handler( request, res ) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write( indexHTML );
  res.end();
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
console.log('URL: ', process.env.PORT ? 'localhost' : '127.0.0.1');
console.log('PORT: ', process.env.PORT || 8080);
server.listen( process.env.PORT || 8080, process.env.PORT ? 'localhost' : '127.0.0.1');
