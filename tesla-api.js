const fetch = require('node-fetch');

const TESLA_OWNER_API_URL = "https://owner-api.teslamotors.com/";
const API_CLIENT_ID = "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384";
const API_CLIENT_SECRET = "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3";

function getToken(email, pwd) {
    const body = {
        "grant_type": "password",
        "client_id": API_CLIENT_ID,
        "client_secret": API_CLIENT_SECRET,
        "email": email,
        "password": pwd
    };
    return fetch(TESLA_OWNER_API_URL+'oauth/token', {
        method: 'POST',
        body:   JSON.stringify(body),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json());
}

const getVehicles = (token) => fetch(TESLA_OWNER_API_URL+'api/1/vehicles', getHeaders(token)).then(res => res.json());

// Vehicle ID is listed in "id_s" response from getVehicles()
const getChargeState = (token, vehicleId) => fetchDataRequest('charge_state', token, vehicleId);

const getMobileAccess =(token, vehicleId) => fetchVehicleData('mobile_enabled', token, vehicleId);

const getVehicleState = (token, vehicleId) => fetchDataRequest('vehicle_state', token, vehicleId);

const getDriveState = (token, vehicleId) => fetchDataRequest('drive_state', token, vehicleId);

const getClimateState = (token, vehicleId) => fetchDataRequest('climate_state', token, vehicleId);

const getGUISettings = (token, vehicleId) => fetchDataRequest('gui_settings', token, vehicleId);

// UTILS
function fetchVehicleData(uri, token, vehicleId) {
    return fetch(TESLA_OWNER_API_URL + 'api/1/vehicles/' + vehicleId + '/'+ uri, getHeaders(token)).then(res => res.json());
}

const fetchDataRequest = (uri, token, vehicleId) => fetchVehicleData('data_request/' + uri, token, vehicleId);

function getHeaders (token) {
    return {headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token }};
}

// EXPORTS
module.exports = {getToken, getVehicles, getChargeState, getMobileAccess, getVehicleState, getDriveState, getClimateState, getGUISettings};