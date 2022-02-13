const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeatqueue')
		.setDescription('all that shit is real good'),
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (queue.repeatMode == 2) {
			queue.setRepeatMode(0);
			await interaction.reply({ content: "▶️ | Continuing normally"});
		} else {
			queue.setRepeatMode(2);
			await interaction.reply({ content: "🔁 | Repeating the queue!"});
		}	
	},
};