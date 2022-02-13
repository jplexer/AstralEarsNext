const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, name } = require('./config.json');
const {DiscordTogether} = require("discord-together");
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_VOICE_STATES, Intents.FLAGS.GUILD_INVITES, Intents.FLAGS.GUILD_MESSAGES] });
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
const { Player } = require("discord-player");

const player = new Player(client);
client.player = player;

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

// When the client is ready, run this code (only once)
client.once('ready', () => {
		console.log(`${name} is all ears!`);
		client.user.setActivity(`A wide range of Songs!`, {
        type: "LISTENING"
      });
});

player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

player.on('error', (queue, err) => {
	queue.metadata.channel.send('An error appeared! Notifiy the Developer ASAP: ```' + err + '```');
  });

player.on('queueEnd', (queue) => {
	queue.metadata.channel.send(`That's all folks! Thanks for using AstralEars!`);
  });

player.on('botDisconnect', (queue) => {
	queue.stop();
  });

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `This command couldn't be executed. Please try again`, ephemeral: true });
	}
});
// Login to Discord with your client's token
client.login(token);
