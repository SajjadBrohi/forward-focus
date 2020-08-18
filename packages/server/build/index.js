const express = require('express');
const app = express();
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.listen(3000, () => {
    console.log('Server started at port 3000.');
});
