import { ActionRowBuilder, ModalBuilder, TextInputBuilder } from '@discordjs/builders';
import { Client, GatewayIntentBits, TextInputStyle } from 'discord.js';

// Declaring our client instance. Intents define and detect which events your discord bot can read internally and allows us to access built-in properties for specified events.
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('interactionCreate', async interaction => {

    // We'll assign a constant to the ModalBuilder class so we can access it later.
    // Handling Modals works a bit differently than working with embedBuilders etc. due to its nature of being used as callback structures.
    const modal = new ModalBuilder()
        .setCustomId('modal')
        .setTitle('Modal Title');

    // Now we assign components to the modal. Follow as is
    modal.addComponents(
        new ActionRowBuilder()
            .addComponents(
                // This is what will display inside as interactive components, for example we can create a text box to type in. So we'll add a component to the modal to do that.
                new TextInputBuilder()
                    .setCustomId('input') // It's important to have clear and memorable IDs, so this way you can access what the user input was and make use of it.
                    .setStyle(TextInputStyle.Short)
                    .setLabel('The label of the input.') // What displays above the text box.
            ),
    );

    // We're going to use a switch statement here just to give more clarification on other opportunities other than using if else.
    switch(true) {
    case interaction.commandName === 'ping': // If the user types in /ping
        await interaction.showModal(modal); // Show the modal.
        break;

    case interaction.customId === 'modal': // In the background, discord checks for customId events. Assuming a user clicks submit and the id of the modal is 'modal'. Do stuff.
        await interaction.reply(`You typed in ${interaction.fields.getTextInputValue('input')} and then clicked submit.`);
        break;
        
    }
});

// Doing stuff when the bot is finished compiling.
client.on('ready', () => {
    console.log('Bot is on');
});

// Logging in
client.login(process.env.TOKEN);