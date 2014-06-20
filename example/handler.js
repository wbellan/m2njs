(function() {
  var mongrel2 = require('m2njs');

  /*
    This should match the equivalent in your mongrel2 
    configuration file.
    nodejshandler.conf is an example mongrel2 configuration file.
  */
  var config = {
    recv_spec: 'tcp://127.0.0.1:9996',
    send_spec: 'tcp://127.0.0.1:9997',
    identity: '81b7114c-534c-4107-9f17-b317cfd59f62'
  }

  mongrel2.connect(config.recv_spec, config.send_spec, config.identity, function(msg, reply) {
    /*
      In this example, I add an additional header to send back.
    */
    var headers = msg.headers;
    headers.responder = 'Hello, world from Node.JS handler!';
    reply(200, headers, JSON.stringify(msg));
  });

}).call(this);
