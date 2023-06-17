const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

//app.get("/", (req, res) => res.type('html').send(html));


const server = app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const html = `
<!DOCTYPE html>
<html>
    <head>
    <title>Hello from Render!</title>
    </head>
</html>
`

const qrcode = require('qrcode-terminal');

const { Client, NoAuth  } = require('whatsapp-web.js');

const client = new Client({
    authStrategy: new NoAuth()
});
 
var QRCode = require('qrcode');



var string1 = "";
// client.on('qr', qr => {
//     console.log('QR RECEIVED', qr);
//     qrcode.generate(qr, {small: true}, function(qr){
//         console.log(qr)
//         string1 = '<h1>' + JSON.stringify(qr) + '</h1>';
//     });
// });



client.on('qr', qr => {
    QRCode.toDataURL(qr, function (err, url) {
        if (err) console.log('error: ' + err)
        string1="<!DOCTYPE html/><html><head><title>node-qrcode</title></head><body><img src='" + url + "'/></body></html>";
        console.log("printing",string1)
        app.get("/", (req, res) => res.type('html').send(string1));
        console.log("send")
      })
      console.log(string1)
    
});


app.get('/', (req, res) => {
    res.send(string1)
})

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

client.on('message_create', message => {
	if(message.body === '!ping') {
		message.reply('pong');
	}
});
 