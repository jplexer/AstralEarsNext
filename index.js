//require dependencies
const fs = require('fs');
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { token, name } = require('./config.json');
const {DiscordTogether} = require("discord-together");
const path = require('path');
const { Player } = require("discord-player");
const { Reverbnation,  Facebook, Attachment, Vimeo} = require("@discord-player/extractor");
const downloader = require("@discord-player/downloader").Downloader;

//create client
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates, GatewayIntentBits.GuildInvites, GatewayIntentBits.GuildMessages] });
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();
client.name = name;

// initialize player and add extractors
const player = new Player(client);
client.player = player;
player.use("Reverbnation", Reverbnation);
player.use("Facebook", Facebook);
player.use("Attachment", Attachment);
player.use("Vimeo", Vimeo);
player.use("YOUTUBE_DL", downloader);

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command);
}

const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

player.on("trackStart", (queue, track) => queue.metadata.channel.send(`🎶 | Now playing **${track.title}**!`))

player.on('error', (queue, err) => {
	if(err = "DestroyedQueue") {

	} else {
		queue.metadata.channel.send('An error appeared! Notifiy the Developer ASAP: ```' + err + '```');
	}
  });

player.on('queueEnd', (queue) => {
	queue.metadata.channel.send(`That's all folks! Thanks for using AstralEars!`);
  });

player.on('botDisconnect', (queue) => {
	queue.stop();
  });

player.on('connectionError', (queue, err) => {
	console.log(err);
  });

/*client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.channel.send(`The command "${interaction.commandName}" couldn't be executed. Please try again`);
	}
});*/
// Login to Discord with your client's token
client.login(token);
