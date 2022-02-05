const fs = require('fs');
const { Client, Collection, Intents } = require('discord.js');
const { token, name } = require('./config.json');
const {DiscordTogether} = require("discord-together");
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.discordTogether = new DiscordTogether(client);
client.commands = new Collection();

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
		setInterval(setActivity, 300000, client);
		setActivity(client);
});

function getRandom () {
    if (arguments.length == 1) {
      if (typeof arguments[0] == Array) {
        var random = Math.floor(Math.random() * 1000) % arguments[0].length;
        return arguments[0][random];
      }
    } else {
      var random = Math.floor(Math.random() * 1000) % arguments.length;
      return arguments[random];
    }
  }

function setActivity(client) {
    client.user.setActivity(getRandom(
      `The Outlaws - Green Grass and High Tides`,
      `DJT - The Witch`,
      `Anders Enger Jensen - DiscoVision`,
      `Michael Jackson - Billie Jean`,
      `Vrabbers - Silly`,
      `TrackTribe - Walk Through the Park`,
      `System of a Down - Toxicity`, 
      `Lionel Richie - Hello`,
	  `Nokia - Ringtone Arabic`,
	  `Air Supply - All Out Of Love`,
	  `Karl Marx - The Communist Manifesto`,
	  `Alexandrov Ensemble - The National Anthem of the United Socialist Soviet Republics`,
      ), {
        type: "LISTENING"
      });
  }

client.on('interactionCreate', async interaction => {
	if (!interaction.isCommand()) return;

	const command = client.commands.get(interaction.commandName);

	if (!command) await interaction.reply({ content: `This command doesn't exist in the rewrite yet!`, ephemeral: true });// return;

	try {
		await command.execute(interaction, client);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: `This command couldn't be executed. Please try again`, ephemeral: true });
	}
});
// Login to Discord with your client's token
client.login(token);
