import { EmbedBuilder } from '@discordjs/builders';
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

// We'll create a message that will display an embed here.
client.on('messageCreate', message => {

    if (message.author.bot) return; // Ensure that the bot won't infinitely loop itself if it reads its own message.

    // Here we'll ensure that the contents of the message that gets detected through the messageCreate event starts with 'embed'. Responds with our embed if the condition is met.
    if (message.content.startsWith('embed')) {
        message.channel.send({
            embeds: [
                new EmbedBuilder()
                    .setTitle('Hello World')
                    .setDescription('This is an example embed.')
                    .setAuthor({ name: message.author.username, iconURL: 'https://discordjs.guide/meta-image.png' })
                    .setFields(
                        { name: '1st Test Field', value: 'Value of 1st Field' },
                        { name: '2nd Test Field', value: 'Value of 2nd Field' }
                    )
                    .setImage('https://discordjs.guide/meta-image.png')
                    .setThumbnail('https://discordjs.guide/meta-image.png')
                    .setFooter({ text: 'Footer', iconURL: 'https://discordjs.guide/meta-image.png' })
                    .setColor(0xFF0000)
                    .setTimestamp()
            ]
        });
    }
});

// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);