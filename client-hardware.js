var io = require('socket.io-client'),
  client = io.connect('http://127.0.0.1:8080', {reconnect: true}),
  camera = require('./camera/index')();

camera.setSocket( client );
client.on('connect', function( ){
  console.log('we are connected');

  client.on('event:take:action', function(){
    console.log('taking action');
    console.log('Camera status: ', camera.status() );
    camera.start();
  });
});