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

  // SET CAMERA MODE
  socket.on('client:camera:mode', function(mode){
    io.sockets.emit('hardware:camera:mode', mode);
  });

  // EXECUTE CAMERA ACTION
  socket.on('client:take:action', function(){
    io.sockets.emit('hardware:take:action');
  });

  // NOTIFY WHEN CAMERA FINISHED
  socket.on('hardware:camera:done', function(uri){
    console.log('Camera done, url', uri);
    io.sockets.emit('client:camera:done', uri );
  });

  // GET CAMERA STATUS
  socket.on('client:get:status', function(){
    io.sockets.emit('hardware:get:status');
  });
  socket.on('hardware:camera:status', function(mode){
    io.sockets.emit('client:camera:status', mode);
  });

});

console.log('listening');
console.log('PORT: ', process.env.PORT || 8080);
if( process.env.PORT ) {
  server.listen( process.env.PORT );
} else {
  server.listen( 8080, '127.0.0.1');
}
