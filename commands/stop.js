const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('stop')
		.setDescription('hammertime'),
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		queue.stop();
		await interaction.reply({ content: "Stopping...", ephemeral: true });
	},
};