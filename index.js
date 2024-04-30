const { Client, Intents, CommandInteractionOptionResolver } = require('discord.js');
const prefix = '+';
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  if (interaction.commandName === 'create-bot') {
    const token = interaction.options.getString('token');
    try {
      await client.login(token);
      await interaction.reply('Le bot est en ligne !');
    } catch (error) {
      console.error(error);
      await interaction.reply('Le token est invalide ou une erreur est survenue lors de la création du bot.');
    }
  } else if (interaction.commandName === 'stop-bot') {
    try {
      await client.destroy();
      await interaction.reply('Bot stopped successfully!');
    } catch (error) {
      console.error(error);
      await interaction.reply('Error stopping the bot.');
    }
  }
});

client.on('message', message => {
  if (message.content.startsWith(prefix + 'test')) {
    message.channel.send('test');
  }
});

client.login(process.env.TOKEN);

client.once('ready', async () => {
  await client.application.commands.set([
    {
      name: 'create-bot',
      description: 'Start the bot with the provided token.',
      options: [
        {
          name: 'token',
          description: 'The bot token to start the bot.',
          type: 'STRING',
          required: true,
        },
      ],
    },
    {
      name: 'stop-bot',
      description: 'Stop the bot.',
    },
  ]);
});
