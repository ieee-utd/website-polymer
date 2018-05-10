var http = require('http');
var httpProxy = require('http-proxy');

var addresses = [
  {
    host: "localhost",
    port: 8081
  },
  {
    host: "localhost",
    port: 8082
  }
];

var proxyServers = addresses.map(function (target) {
  return new httpProxy.createProxyServer({
    target: target
  });
});

var server = http.createServer(function (req, res) {
  var proxy = proxyServers.shift();
  proxy.web(req, res);
  proxyServers.push(proxy);
});

server.listen(8000, function () {
  console.log('Example app listening on port 8000!');
});