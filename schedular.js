const cron = require('node-cron');
const fs = require('fs');
const twilio = require('twilio');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);