var zmq = require('zmq');
var pull = zmq.socket('pull');
var pub = zmq.socket('pub');
var http = require('http');
var __hasProp = Object.prototype.hasOwnProperty;
var MessageParser = require('./message-parser');

buildHttpResponse = function(status, headers, body) {
	var _ref;
	var h;
	var header;
	var value;

	headers['Content-Length'] = body.length;
	h = [];
	_ref = headers;

	for (header in _ref) {
		if (!__hasProp.call(_ref, header)) continue;
		value = _ref[header];
		h.push("" + (header) + ": " + (headers[header]));
	}

	return 'HTTP/1.1 ' + status + ' ' + http.STATUS_CODES[status] + '\n' + (h.join('\n')) + '\n\n' + (body);
};

exports.connect = function(recv_spec, send_spec, identity, callback) {
	var msgParser = new MessageParser();

	pull.connect(send_spec);
	pull.identity = identity;
	console.log('Pull connected via ' + send_spec);

	pub.connect(recv_spec);
	pub.identity = identity;
	console.log('Pub connected via ' + recv_spec);

	return pull.on('message', function(message) {
		var msg = msgParser.parse(message.toString('utf8'));
		return callback(msg, function (status, headers, body) {
			return pub.send(msg.uuid + ' ' + (String(msg.connId).length) + ':' + msg.connId + ', ' + 
				buildHttpResponse(status, headers, body));
		});
	});
};