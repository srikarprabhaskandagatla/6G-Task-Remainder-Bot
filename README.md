<h1 align="center">
  <br>
    Task Remainder WhatsApp Bot: Easy Task Schedular and Remainder
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
  <a href="#why-task-remainder-whatsapp-bot">Why Task Remainder WhatsApp Bot?</a>
  •
  <a href="#how-does-it-work">How does it work?</a>
  •
  <a href="#instructions-to-setup">Instructions to Setup</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#contribution">Contribution</a>
</p>

# Why Task Reminder WhatsApp Bot?
Cleaning a house is also a big part of daily life. If you are living with your friends, cleaning your kitchen and bathroom is also a part of all roommates' responsibility. For this reason, I have created a Task Reminder WhatsApp Bot — which sends reminders to all the roommates about when they need to clean the kitchen or bathroom. This played an integral role for me while I was pursuing my Master's in Computer Science at UMass Amherst, where we, the roommates in apartment 6G, used this to schedule our kitchen and bathroom cleaning among us.

# How does it work?
This bot reminds the specific roommate when they need to clean the kitchen or bathroom. Kitchen cleaning is reminded every week to different roommates, and bathroom cleaning is reminded to the roommate who doesn't have a kitchen schedule. Bathroom reminders are sent bi-weekly (i.e., every 2 weeks), and kitchen reminders are sent every weekend.

Kitchen reminders are sent on Friday, Saturday, and Sunday. If the reminded roommate replies 'Done' after completing the task on their first reminder date (Friday), they stop getting reminders for that week. Otherwise, they continue to receive reminders until Sunday. The same goes for bathroom cleaning reminders, but those are sent every 2 weeks instead of weekly.

Now into technicality, this application uses Node.js at runtime and an Express server is deployed to run the application. As obvious, JavaScript is used for this application.

# Instructions to Setup
- Setup the environmental variables
  - Create a `.env` file in the working directory. Copy the contents of [.env.example](.env.example).
  - Follow the comments to fill in all the environment variables. The Account SID and Authentication Token are taken from the Twilio API setup, which is discussed below.
- Setup account in Twilio. 
To access the SID and Authentication Token, follow the video below.
[Watch Demo Video](https://www.youtube.com/watch?v=UVez2UyjpFk&ab_channel=TwilioDevs)