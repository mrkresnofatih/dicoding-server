const http = require('http')
const {urlPaths} = require("./urlPaths");

const requestListener = (request, response) => {
    const {method, url} = request;

    switch (url) {
        case urlPaths.HOME: {
            if (method === "GET") {
                response.setHeader('Content-Type', 'text/html');
                response.statusCode = 200;
                response.end('<h1>Hello Server: GET</h1>')
            } else if (method === "POST") {
                let body = []

                request.on('data', (chunk) => {
                    body.push(chunk)
                })

                request.on('end', () => {
                    body = Buffer.concat(body).toString();
                    const {name} = JSON.parse(body)
                    response.end(`<h1>Hai mr.${name}</h1>`)
                })
            } else {
                response.end('<h1>Bad Request</h1>')
            }
            break;
        }
        case urlPaths.ABOUT: {
            response.setHeader('Content-Type', 'text/html');
            response.statusCode = 200;
            response.end('<h1>ABOUT API REQUESTED</h1>')
            break;
        }
        default:
            response.setHeader('Content-Type', 'text/html');
            response.statusCode = 200;
            response.end('<h1>BAD REQUEST</h1>')
            break;
    }

}

const server = http.createServer(requestListener)

const port = 5000;
const host = 'localhost';

server.listen(port, host, () => {
    console.log(`Server berjalan pada http://${host}:${port}`);
});