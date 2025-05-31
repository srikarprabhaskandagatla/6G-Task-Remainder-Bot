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

// Send rent reminder to all members
function sendRentReminder() {
  people.forEach(person => {
    const message = `Yoo ${person.name}, pay the rent and utilities this month meh!`;
    sendCustomMessage(person, message);
  });
}

// Helper: Get next eligible bathroom index (not same as kitchen)
function getNextBathroomIndex(kitchenIndex, prevBathroomIndex) {
  for (let i = 1; i <= people.length; i++) {
    let idx = (prevBathroomIndex + i) % people.length;
    if (idx !== kitchenIndex) return idx;
  }
  return (kitchenIndex + 1) % people.length;
}

// Enhanced rotateTask for biweekly bathroom and kitchen-bathroom collision avoidance
function enhancedRotateTasks() {
  let state = loadState();
  state.kitchenIndex = (state.kitchenIndex + 1) % people.length;
  if (state.bathroomWeek === undefined) state.bathroomWeek = 0; 
  if (state.bathroomWeek === 0) {
    state.bathroomIndex = getNextBathroomIndex(state.kitchenIndex, state.bathroomIndex ?? 0);
  }

  state.bathroomWeek = (state.bathroomWeek + 1) % 2;
  state.done = { kitchen: false, bathroom: false };
  saveState(state);
}

// Enhanced reminders for biweekly bathroom
function enhancedSendReminders(day) {
  let state = loadState();

  if (!state.done) state.done = { kitchen: false, bathroom: false };

  if (!(day === 'today' && state.done.kitchen)) {
    const kitchenPerson = people[state.kitchenIndex];
    let kitchenMsg = day === 'tomorrow'
      ? `Yoo ${kitchenPerson.name}!, you need to clean the kitchen tomorrow meh!`
      : `Yoo ${kitchenPerson.name}!, clean the kitchen today meh!`;
    sendCustomMessage(kitchenPerson, kitchenMsg);
  }

  if (state.bathroomWeek === 0 && !(day === 'today' && state.done.bathroom)) {
    const bathroomPerson = people[state.bathroomIndex];
    let bathroomMsg = day === 'tomorrow'
      ? `Yoo ${bathroomPerson.name}!, you need to clean the bathroom tomorrow meh!`
      : `Yoo ${bathroomPerson.name}!, clean the bathroom today meh!`;
    sendCustomMessage(bathroomPerson, bathroomMsg);
  }
}

// Schedule tasks
function scheduleReminders() {
  cron.schedule('0 10 * * 5', () => { // (Friday 10:00 AM)
    enhancedSendReminders('tomorrow');
  });

  cron.schedule('0 10 * * 6', () => { // (Saturday 10:00 AM)
    enhancedSendReminders('today');
  });

  cron.schedule('0 10 * * 0', () => { // (Sunday 10:00 AM)
    enhancedSendReminders('today');
    enhancedRotateTasks(); // Rotate after Sunday cleaning
  });

  cron.schedule('0 21 4 * *', () => { // (4th of every month at 9:00 PM)
    sendRentReminder();
  });

  console.log("Scheduling started: Kitchen (weekly), Bathroom (biweekly), with Friday reminders and monthly rent reminder");
}