const express = require('express');
const app = express();
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
app.use(cors());

const options = {
    target: 'http://api-server:4000',
    changeOrigin: true
}

app.use('/register', createProxyMiddleware(options));
app.use('/login', createProxyMiddleware(options));

app.listen(5000, () => {
    console.log('Proxy running on port 5000');
});