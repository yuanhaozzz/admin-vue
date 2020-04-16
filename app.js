let express = require('express');
let server = express();
let fs = require('fs');
let path = require('path');

server.use(express.static(path.resolve(__dirname, 'dist')));

server.get('*', (req, res) => {
    let html = fs.readFileSync(
        path.resolve(__dirname, 'dist/backstage/index.html')
    );
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
});

server.listen(3002, () => {
    console.log('start 3002');
});
