const express = require('express');
const fetch = require('node-fetch');

const PORT = 8000;
const TESLA_OWNER_API_URL = "https://owner-api.teslamotors.com/";
const API_CLIENT_ID = "81527cff06843c8634fdc09e8ac0abefb46ac849f38fe1e431c2ef2106796384";
const API_CLIENT_SECRET = "c7257eb71a564034f9419ee651c7d0e5f7aa6bfbd18bafb5c5c033b093bb2fa3";

const body = {
    "grant_type": "password",
    "client_id": API_CLIENT_ID,
    "client_secret": API_CLIENT_SECRET,
    "email": "email",
    "password": "pwd"
};

fetch(TESLA_OWNER_API_URL+'oauth/token', {
    method: 'POST',
    body:   JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
})
    .then(res => res.json())
    .then(json => console.log(json));