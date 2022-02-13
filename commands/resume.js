const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('resume')
		.setDescription('aight I am back'),
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		queue.setPaused(false);
		await interaction.reply({ content: "▶️ | We are back!"});
	},
};