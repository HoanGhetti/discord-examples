import { ActionRowBuilder, SelectMenuBuilder } from '@discordjs/builders';
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

client.on('messageCreate', message => {

    if (message.author.bot) return;

    if (message.content.startsWith('menu')) {
        message.channel.send({
            components: [
                new ActionRowBuilder()
                    .setComponents(
                        new SelectMenuBuilder()
                            .setCustomId('menu')
                            .setPlaceholder('Select an option')
                            .setOptions(
                                {
                                    label: 'This is a menu option',
                                    description: 'Menu Option Description',
                                    value: 'Menu Value',
                                    emoji: { 
                                        name: '👍'
                                    }
                                },
                            ),
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