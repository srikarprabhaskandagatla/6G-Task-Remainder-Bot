// Import necessary modules
const cron = require('node-cron');
const fs = require('fs');
const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Roommates for names and phone numbers
const people = [
  {name: NAME_1, phone: PHONE_NUMBER_1},
  {name: NAME_2, phone: PHONE_NUMBER_2},
  {name: NAME_3, phone: PHONE_NUMBER_3}
];

// To schedule tasks, the state is loaded from state.json
function loadState() {
  return JSON.parse(fs.readFileSync('state.json'));
}

// Save the current state to state.json
function saveState(state) {
  fs.writeFileSync('state.json', JSON.stringify(state, null, 2));
}

function sendCustomMessage(person, message) {
  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_NUMBER,
      to: person.phone
    })
    .then(msg => console.log(`Sent reminder to ${person.name}: ${msg.sid}`))
    .catch(err => console.error(err));
}