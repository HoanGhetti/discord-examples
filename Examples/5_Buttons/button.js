import { ActionRowBuilder, ButtonBuilder } from '@discordjs/builders';
import { ButtonStyle, Client, GatewayIntentBits } from 'discord.js';

// Declaring our client instance. Intents define and detect which events your discord bot can read internally and allows us to access built-in properties for specified events.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// We'll create a message that will display a button here.
client.on('messageCreate', message => {

    if (message.author.bot) return; // Ensure that the bot won't infinitely loop itself if it reads its own message.

    // Here we'll ensure that the contents of the message that gets detected through the messageCreate event starts with 'button'. Responds with a button if the condition is met.
    if (message.content.startsWith('button')) {
        message.channel.send({
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new ButtonBuilder()
                            .setCustomId('button_1')
                            .setStyle(ButtonStyle.Primary)
                            .setLabel('A Button Label')
                            .setEmoji({ name: '👍' })
                    ),
            ],
        });
    }
});

// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);