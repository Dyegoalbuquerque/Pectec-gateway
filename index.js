let http = require('http');
const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const helmet = require('helmet');


app.use(logger('dev'));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


const estoqueServiceProxy = httpProxy('http://localhost:5000/api/estoque/tiposEstoque');

app.get('/api/estoque/tiposEstoque', (req, res, next) => {
    estoqueServiceProxy(req, res, next);
})

var server = http.createServer(app);
let port = 3000;
server.listen(port, () => console.log(`gateway api running http://localhost:${port}`));