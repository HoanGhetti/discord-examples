import { Client, GatewayIntentBits } from 'discord.js';
import exampleSchema from '../schemas/schemas.js';
import mongoose from 'mongoose';

// In this example, we're going to increment the 'restarts' key value that we declared in our exampleSchema.

// Declaring our client instance.
const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ] 
});


// As explained in the other modules, the ready event does something once the bot finishes compiling. In place of this, we'll go ahead and edit some values in our schema.
client.on('ready', async () => {
    console.log('Bot is on');

    // Initialize our database instance. We'll wrap it in a with the try/catch keywords to have the console throw any errors that would be uncaught otherwise.
    try {
        mongoose.connect(process.env.DB_URI, {
            keepAlive: true
        });
        console.log('Database connection successful');
    } catch(err) {
        console.error(err);
    }

    // Now whenever the ready event happens, (again whenever the bot finishes compiling) we'll go ahead and update the 'restarts' value in our schema to increment everytime.
    await exampleSchema.updateOne(
        // The first argument in updateOne or any other mongoose methods relevent to updating will always need a document reference.
        // The reference that we give it allows MongoDB to search for the document that, in this case, where _id is equal to the bot's ID.
        { _id: client.user.id }, // Search for a document where _id equals the bot's ID
        {
            $inc: { restarts: 1 } // After that, we'll use the $inc property that will increment whichever schema property that we give it. (Inside the document that gets found)
        },
        { upsert: true }  // If the document does NOT exist, add one. This should only occur once.
    );
        
});

// Logging in
client.login(process.env.TOKEN);