import { Client, GatewayIntentBits } from 'discord.js';

// Declaring our client instance. Intents define and detect which events your discord bot can read internally and allows us to access built-in properties for specified events.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// Creating a simple message

// Think of the on() method as an event tracker and executor. In this instance, Discord will always check for events that occur with 'messageCreate', initialized by the on() method.
client.on('messageCreate', message => {

    // Ensure that the message is only being received by a user and not a discord bot. Without doing this the bot would infinitely repeat itself.
    if (message.author.bot) return;

    // Here we'll ensure that the contents of the message that gets detected through the messageCreate event starts with 'ping'. Responds with pong if the condition is met.
    if (message.content.startsWith('ping')) {
        message.channel.send('pong');
    }    
});

// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);