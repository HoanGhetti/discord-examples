import { Client, GatewayIntentBits, SlashCommandBuilder } from 'discord.js';
import { DiscordInteractions } from 'slash-commands';

// Declaring our client instance. Intents define and detect which events your discord bot can read internally and allows us to access built-in properties for specified events.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// To register our commands, we'll be using a third-party node package called slash-commands. As you can see we imported it at the top of the file.
// Using this package simplifies a lot of stuff and prevents us from having to do more work.

// We'll create a constant that inherits slash-commands properties.
const interaction = new DiscordInteractions({
    applicationId: process.env.CLIENT_ID,
    authToken: process.env.TOKEN,
    publicKey: process.env.PUBLICKEY,
});

// Here we create our command using Discord's built-in SlashCommandBuilder. In this case we'll declare an object so we can then use an identifier for it.
const commands = {
    ping: new SlashCommandBuilder()
        .setName('ping') // Must be lowercase
        .setDescription('An example description for a slash command')
        .addBooleanOption(option =>
            option.setName('option')
                .setDescription('An example description for an option')
                .setRequired(true)
        )
};

// Now that we created our command above, we can finally register it. We'll use async/await to ensure that the event resolves.
async function registerCommand() {
    await interaction
        .createApplicationCommand(commands.ping, '195983081457451018') // The second argument takes in a Guild ID, which will register the command to only your server and not global.
        .then(console.table) // Log the command in the console if created successfully.
        .catch(console.error); // Throw an error if something went wrong.
}

// Now lets do something when we call the slash command. Remember to declare your interationCreate events as async/await to ensure that the event resolves.
client.on('interactionCreate', async interaction => {
    if (interaction.commandName === 'ping') {
        // {...} do stuff
        interaction.reply('You entered the ping command.');
        console.log(`${interaction.user.username} just used the ping command.`);
    }
});

// Call our register function here.
registerCommand();


// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);