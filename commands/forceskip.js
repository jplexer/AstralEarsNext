const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
const { PermissionFlagsBits } = require('discord-api-types/v10');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('forceskip')
		.setDescription(`force a skip`)		
		.setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages),
		
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		
		queue.skip();
		await interaction.reply({ content: "Skipping..."});
	},
};