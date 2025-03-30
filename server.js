const http = require('http');
const fs = require('fs').promises; // Using promises for async/await

http.createServer(async (req, res) => {
  try {
    const file = req.url === '/' ? 'index.html' : req.url.slice(1);
    
    // Check .js first, then .css, then default to html
    const type = file.endsWith('.js') ? 'application/javascript'
               : file.endsWith('.css') ? 'text/css'
               : 'text/html';
    
    const data = await fs.readFile(file);
    res.writeHead(200, {'Content-Type': type});
    res.end(data);
  } catch (err) {
    res.writeHead(404);
    res.end('File not found');
  }
}).listen(3000, () => console.log('To-Do App: http://localhost:3000'));