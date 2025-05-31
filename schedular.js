const cron = require('node-cron');
const fs = require('fs');
const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const people = [
  {name: NAME_1, phone: PHONE_NUMBER_1},
  {name: NAME_2, phone: PHONE_NUMBER_2},
  {name: NAME_3, phone: PHONE_NUMBER_3}
];