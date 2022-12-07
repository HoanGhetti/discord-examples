import { Client } from 'discord.js';

// Declaring our client instance.
const client = new Client({ intents: [] });

// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);