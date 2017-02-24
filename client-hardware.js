var io = require('socket.io-client'),
  client = io.connect('http://192.168.2.10:8080', {reconnect: true}),
  camera = require('./camera/index')();

camera.setSocket( client );
client.on('connect', function( ){
  console.log('we are connected');

  // SET CAMERA MODE
  client.on('hardware:camera:mode', function( mode ){
    console.log('Setting mode to: ', mode );
    camera.setMode( mode );
  });

  // EXECUTE ACTION ON HARDWARE
  client.on('hardware:take:action', function(){
    console.log('taking action');
    camera.start();
  });

  // GET STATUS OF HARDWARE
  client.on('hardware:get:status', function(){
    client.emit('hardware:camera:status', camera.status() );
  });
});
