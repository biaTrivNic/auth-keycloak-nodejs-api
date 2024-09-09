const express = require('express');
const app = express();
const https = require('https');
const querystring = require('querystring');
require('dotenv').config();

app.listen(3000, () => {
    console.log('Rodando na http://localhost:3000');
});

app.get('/', (req, res) => {
    const authUrl = `https://${process.env.KEYCLOAK_HOST}/realms/${process.env.REALM}/protocol/openid-connect/auth?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=code`;
    res.redirect(authUrl);
});

app.get('/login/callback', (req, res) => {
    const code = req.query.code;

    const data = querystring.stringify({
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: process.env.REDIRECT_URI
    });

    const options = {
        hostname: process.env.KEYCLOAK_HOST,
        port: 443,
        path: `/realms/${process.env.REALM}/protocol/openid-connect/token`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Content-Length': Buffer.byteLength(data)
        }
    };

    const request = https.request(options, (response) => {
        response.on('data', () => { })

        response.on('end', () => {
            if (response.statusCode === 200) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.end(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Success</title>
          <style>
            body {
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              font-family: Arial, sans-serif;
              background-color: #f0f8ff;
            }
            .message {
              text-align: center;
              padding: 20px;
              border-radius: 10px;
              background-color: #e0f7fa;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              color: #00796b;
              font-size: 24px;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="message">Deu 200, filhão. <br>Fora o show!</div>
        </body>
        </html>
      `);
            } else {
                res.writeHead(res.statusCode, { 'Content-Type': 'text/html' });
                res.end('<h1>Deu tudo foi muito errado mesmo</h1>');
            }
        });
    });

    request.write(data);
    request.end();
});

