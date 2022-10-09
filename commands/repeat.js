const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('repeat')
		.setDescription(`that shit is real good`),
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		if (queue.repeatMode == 1) {
			queue.setRepeatMode(0);
			await interaction.reply({ content: "▶️ | Continuing normally"});
		} else {
			queue.setRepeatMode(1);
			await interaction.reply({ content: "🔂 | Repeating this track"});
		}	
	},
};