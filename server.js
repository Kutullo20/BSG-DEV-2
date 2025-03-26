const http = require('http');
const fs = require('fs');

http.createServer((req, res) => {
  const file = req.url === '/' ? 'index.html' : req.url.slice(1);
  const type = file.endsWith('.css') ? 'text/css' 
           : file.endsWith('.js') ? 'application/javascript' 
           : 'text/html';
  
  fs.readFile(file, (err, data) => {
    res.writeHead(err ? 404 : 200, {'Content-Type': type});
    res.end(err ? 'File not found' : data);
  });
}).listen(3000, () => console.log('To-Do App: http://localhost:3000'));