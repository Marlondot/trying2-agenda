const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

app.get("/", (req, res) => res.type('html').send(html));

const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
    <head>
    <title>Hello from Render!</title>
    </heady>
</html>
`

const qrcode = require('qrcode-terminal');

const { Client, NoAuth  } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new NoAuth()
});
 

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message_create', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 