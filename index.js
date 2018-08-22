const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const tesla = require('./tesla-api');
const PORT = 8000;

app.use(bodyParser.json()); // for parsing application/json

app.post('/token', (req, res) => {
    tesla.getToken(req.body.email, req.body.password)
        .then(response => res.send(response));
});

app.get('/vehicles', (req, res) => {
    tesla.getVehicles(req.get('token'))
        .then(response => res.send(response));
});

app.get('/chargeState/:vehicleId', (req, res) => {
    tesla.getChargeState(req.get('token'), req.params.vehicleId)
        .then(response => res.send(response));
});

app.get('/mobileAccess/:vehicleId', (req, res) => {
    tesla.getMobileAccess(req.get('token'), req.params.vehicleId)
        .then(response => res.send(response));
});

app.get('/vehicleState/:vehicleId', (req, res) => {
    tesla.getVehicleState(req.get('token'), req.params.vehicleId)
        .then(response => res.send(response));
});

app.listen(PORT, () => console.log(`Tesla server listening on port ${PORT}`));