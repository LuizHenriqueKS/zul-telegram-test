const express = require('express');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3000;
const token = process.env.TOKEN;
const myURL = process.env.MY_URL;

const botURL = `https://api.telegram.org/bot${token}`;

axios.post(`${botURL}/setWebhook`, { url: myURL }).then(data => {
    console.log("Webhook configurado", data.data);
});

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello world');
});

app.post('/readUpdates', (req, res) => {
    const update = req.body;
    console.log('Updates: ', update);
    if (update && update.message && update.message.text.startsWith('/oi')) {
        const chat_id = update.message.chat.id;
        axios.post(`${botURL}/sendMessage`, { chat_id: chat_id, text: 'Oi' }).then(evt => {
            console.log('Mensagem enviada: ', evt.data);
        }).catch(evt => {
            console.error('Resposta de erro', evt.response);
        });
    }
    res.send('Ok');
});

app.listen(port, () => {
    console.log(`Servidor iniciado na porta: ${port}`);
});