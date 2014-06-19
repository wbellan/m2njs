# m2njs

Mongrel2 has handlers, which take HTTP requests, and turns them into nicely packed and processed [ZeroMQ](http://www.zeromq.org/intro:get-the-software) messages for your asynchronous handlers. m2njs is a Mongrel2 handler for Node.js.

# How To

This assumes you have [zeromq](http://www.zeromq.org/intro:get-the-software) and [mongrel2](http://mongrel2.org/wiki/quick_start.html) installed.

Navigate to your mongrel2 installation `bin` directory. Add the following to the mongrel2 configuration file:

```config
nodejs = Handler(
  send_spec = 'tcp://127.0.0.1:9997',
  send_ident = '81b7114c-534c-4107-9f17-b317cfd59f62',
  recv_spec = 'tcp://127.0.0.1:9996',
  recv_ident = '81b7114c-534c-4107-9f17-b317cfd59f62'
)
```
You can change the address and port to whatever fits your need, then load your config using the following:

```bash
m2sh load -config YOUR_MONGREL2_CONF_FILE
```

Once configuration is loaded, start mongrel2 by issuing the following:

```bash
m2sh start -host localhost
```

Install m2njs using npm:

```bash
npm install m2njs
```

Use it in your code:

```javascript
...
  var mongrel2 = require('m2njs');

  /*
    This should match the equivalent in your mongrel2 
    configuration file.
    example/nodejshandler.conf is an sample mongrel2 configuration file.
  */
  var config = {
    recv_spec: 'tcp://127.0.0.1:9996',
    send_spec: 'tcp://127.0.0.1:9997',
    identity: '81b7114c-534c-4107-9f17-b317cfd59f62'
  }

  mongrel2.connect(config.recv_spec, config.send_spec, config.identity, function(msg, reply) {
    
    //Perform some logic
    
    reply(200, headers, JSON.stringify(msg));
  });
....
```

# Copyright

Copyright (c) 2014 Wardell Bellanger. See LICENSE for details.
