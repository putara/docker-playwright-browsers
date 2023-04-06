require('http').createServer((req, res) => {
  if (req.method === 'GET') {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end('<html>Kia ora</html>');
  } else {
    res.writeHead(400);
    res.end();
  }
}).listen(3000);