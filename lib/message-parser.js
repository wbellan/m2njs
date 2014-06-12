module.exports = MessageParser;

function MessageParser() {
}

split = function(str, chr, limit) {
  var parts, ret;
  parts = str.split(chr);
  ret = parts.slice(0, limit - 1);
  ret.push(parts.slice(limit - 1).join(chr));
  return ret;
};

MessageParser.prototype.parseNetString = function(ns) { 
  var _ref, len, rest;
  _ref = split(ns, ':', 2);
  len = _ref[0];
  rest = _ref[1];
  len = parseInt(len);
  if (rest[len] !== ',') {
    throw "Netstring did not end in ','";
  }
  return [rest.slice(0, len), rest.slice(len + 1)];
};

MessageParser.prototype.parse = function(message) {
  var _ref;
  var body;
  var connId;
  var headers;
  var path;
  var rest;
  var uuid;

  _ref = split(message, ' ', 4);
  uuid = _ref[0];
  connId = _ref[1];
  path = _ref[2];
  rest = _ref[3];

  _ref = this.parseNetString(rest);
  headers = _ref[0];
  rest = _ref[1];
  body = this.parseNetString(rest)[0];

  return {
    headers: JSON.parse(headers),
    body: body,
    uuid: uuid,
    connId: connId,
    path: path
  }
}