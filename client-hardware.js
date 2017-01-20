var io = require('socket.io-client'),
  client = io.connect('http://192.168.0.8:8080', {reconnect: true}),
  camera = require('./camera/index')();

camera.setSocket( client );
client.on('connect', function( ){
  console.log('we are connected');

  client.on('event:camera:mode', function( mode ){
    console.log('Setting mode to: ', mode );
    camera.setMode( mode );
  });
  client.on('event:take:action', function(){
    console.log('taking action');
    console.log('Camera status: ', camera.status() );
    camera.start();
  });
});
