var expect = require('chai').expect;
var assert = require('assert')
var MessageParser = require('../lib/message-parser');

describe("MessageParser", function() {
  describe("parse", function() {
    it("should parse message", function() {
      var message = '81b7114c-534c-4107-9f17-b317cfd59f62 3 / 447:{"PATH":"/","x-forwarded-for":"127.0.0.1","accept-language":"en-US,en;q=0.8","accept-encoding":"gzip,deflate,sdch","connection":"keep-alive","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36","host":"localhost:9000","METHOD":"GET","VERSION":"HTTP/1.1","URI":"/","PATTERN":"/"},0:,';

      var msgParser = new MessageParser();
      var msg = msgParser.parse(message);
      expect(msg.uuid).to.equal('81b7114c-534c-4107-9f17-b317cfd59f62');
      expect(msg.connId).to.equal('3'); 
      expect(msg.path).to.equal('/');
      expect(msg.body).to.equal('');
      expect(JSON.stringify(msg.headers)).to.equal('{"PATH":"/","x-forwarded-for":"127.0.0.1","accept-language":"en-US,en;q=0.8","accept-encoding":"gzip,deflate,sdch","connection":"keep-alive","accept":"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8","user-agent":"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/35.0.1916.114 Safari/537.36","host":"localhost:9000","METHOD":"GET","VERSION":"HTTP/1.1","URI":"/","PATTERN":"/"}');
    });
  });  
  describe("parseNetString", function() {
    it("should parse NetString", function() {
      var msgParser = new MessageParser();
      expect(msgParser.parseNetString("12:hello world!,")).to.eql(['hello world!', '']); 
    });
  });
  describe("parseNetString with error", function() {
    it("should throw error parsing NetString", function() {
      var msgParser = new MessageParser();
      expect(function() {
      	(new MessageParser()).parseNetString("12:hello world!");
      }).to.throw("Netstring did not end in ','");
    });
  });
});