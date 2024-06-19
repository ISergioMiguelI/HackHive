const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;


app.use(express.static('public'));
app.use(express.json());


app.get('/api/site-status', (req, res) => {
    fs.readFile('siteStatus.json', (err, data) => {
        if (err) {
            return res.status(500).send('Error reading site status');
        }
        res.send(JSON.parse(data));
    });
});


app.post('/api/site-status', (req, res) => {
    const newStatus = req.body.status;
    fs.writeFile('siteStatus.json', JSON.stringify({ status: newStatus }), (err) => {
        if (err) {
            return res.status(500).send('Error updating site status');
        }
        res.send({ message: 'Site status updated successfully' });
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

