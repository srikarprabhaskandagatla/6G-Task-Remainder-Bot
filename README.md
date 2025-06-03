<h1 align="center">
  <br>
    Task Scheduler and Reminder WhatsApp Bot: Easy Task Schedular and Reminder
  <br>
</h1>

<p align="center"> 
  <a href="https://www.oracle.com/developer/javascript/">
    <img src="https://img.shields.io/badge/-JavaScript-grey?style=flat-square&logo=javascript&logoColor=F7DF1E" alt="JavaScript">
  </a>
  <a href="https://nodejs.org/en">
    <img src="https://img.shields.io/badge/-Node JS-5FA04E?style=flat-square&logo=node.js&logoColor=white" alt="Nodejs">
  </a>
  <a href="https://www.twilio.com/en-us">
    <img src="https://img.shields.io/badge/-Twilio-F22F46?style=flat-square&logo=twilio&logoColor=white" alt="Twilio">
  </a>
  <a href="https://www.whatsapp.com/">
    <img src="https://img.shields.io/badge/-WhatsApp-25D366?style=flat-square&logo=whatsapp&logoColor=white" alt="Whatsapp">
  </a>
</p>

<p align="center">
  <a href="#why-task-reminder-whatsapp-bot">Why Task Scheduler and Reminder WhatsApp Bot?</a>
  •
  <a href="#how-does-it-work">How does it work?</a>
  •
  <a href="#instructions-to-setup">Instructions to Setup</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#run-the-code-on-cloud">Run the Code on Cloud</a>
  •
  <a href="#contribution">Contribution</a>
</p>

# Why Task Schedular and Reminder WhatsApp Bot?
Cleaning a house is also a big part of daily life. If you are living with your friends, cleaning your kitchen and bathroom is also a part of all roommates' responsibility. For this reason, I have created a Task Reminder WhatsApp Bot — which sends reminders to all the roommates about when they need to clean the kitchen or bathroom. This played an integral role for us while I was pursuing my Master of Science in Computer Science at UMass Amherst, where we, the roommates in apartment 6G, used this to schedule our kitchen and bathroom cleaning among us.

# How does it work?
This bot reminds the specific roommate when they need to clean the kitchen or bathroom. Kitchen cleaning is reminded every week to different roommates, and bathroom cleaning is reminded to the roommate who doesn't have a kitchen schedule. Bathroom reminders are sent bi-weekly (i.e., every 2 weeks), and kitchen reminders are sent every weekend.

Kitchen reminders are sent on Friday, Saturday, and Sunday. If the reminded roommate replies 'Done' after completing the task on their first reminder date (Friday), they stop getting reminders for that week. Otherwise, they continue to receive reminders until Sunday. The same goes for bathroom cleaning reminders, but those are sent every 2 weeks instead of weekly. The state is saved as indexies in the `state.json` file.

Now coming to the technical part, this application runs on Node.js, and an Express server is deployed to handle the backend.

# Instructions to Setup
- Clone this repository using the command below:
```bash
git clone https://github.com/srikarprabhaskandagatla/6G-Task-Scheduler-Reminder-Bot.git
```
- Setup the environmental variables:
  - Create a `.env` file in the working directory. Copy the contents of [.env.example](.env.example).
  - Follow the comments to fill in all the environment variables. The Account SID and Authentication Token are taken from the Twilio API setup, which is discussed below.
- Setup account in [Twilio](https://www.twilio.com/en-us). To access the SID and Authentication Token, follow the video below. (Click the image/thumbnail below)

<p align="center"> 
  <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
    <img src="/images/thumbnail.png" alt="Watch the video" width="700"/>
  </a>
</p>

- The required setup is done.

# Installation
- Now, to run the Express Server, we have to install some dependencies which can be done by executing the commands below.

<h3 align="center">
  <br>
    Command 1
  <br>
</h3>

```bash
npm init -y
```
- Creates a `package.json` to manage project dependencies and settings.

<h3 align="center">
  <br>
    Command 2
  <br>
</h3>

```bash
npm install express twilio node-cron dotenv
```
  
  - `express` – A fast, minimal web framework for Node.js.
    - Used to create APIs or servers easily.

  - `twilio` – The official Twilio SDK for Node.js.
    - Lets you send WhatsApp messages, SMS, make calls, etc., using the Twilio API.

  - `node-cron` – A task scheduler library.
    - Used to run code on a schedule (e.g., every Friday at 10 AM).

  - `dotenv` – Loads environment variables from a .env file into process.env.
    - Helps keep secrets (like API keys) out of your code.

  - These will create the files - `package-lock.json`, `package.json`, and a folder `node_modules`.

<h3 align="center">
  <br>
    Command 3
  <br>
</h3>

```bash
node schedular.js
```
  
  - This command runs the Express Server.

- Since this code is capable of taking input replies from roommates on WhatsApp, we need to expose the Express Server using ngrok. This allows the webhook connection from WhatsApp to reach our Express Server.

<h3 align="center">
  <br>
    Command 4
  <br>
</h3>

```bash
ngrok http 7777
```
  
  - This gives us an HTTP link which needs to be configured on the Twilio website. Go to the Console and then follow this path to set up the webhook link - `Messaging > Try it out > Send a WhatsApp message > Sandbox settings` and here, paste the ngrok link under `When a message comes in` and change the method to `POST`.

- That's it - your Task Scheduler and Reminder is now working!

# Run the Code on Cloud
We have discussed how to set this up on a local system. To run it on the cloud without using your local system, you can host this code on Render, Heroku, or an instance of AWS. Follow the same steps till Command 3.

Instead of running Command 4 (which exposes the Express Server using ngrok), you can simply use the HTTP link provided by your hosting service and paste it into the Twilio website.

# Contribution
If you have any feedback, suggestions, or find a bug, feel free to open an issue or submit a pull request — your contributions are always welcome!

This project is licensed under the MIT License. For more details, see the [LICENSE](LICENSE) file.