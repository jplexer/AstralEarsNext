const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('seek')
		.setDescription('is this revenge i am seeking?')
		.addStringOption(option => option.setName('input').setDescription('In "MM:SS" Format!').setRequired(true)),
	/*async execute(interaction, client) {
		const query = interaction.options.get("input").value;
		function hmsToMiliseconds(str) {
			var p = str.split(':'),
				s = 0, m = 1;
		
			while (p.length > 0) {
				s += m * parseInt(p.pop(), 10);
				m *= 60;
			}
		
			return s*1000;
		}

		if(!query.match(/\d+:[0-5]\d/)) {
			return await interaction.reply({ content: `Cannot seek to ${query}`, ephemeral: true });
		}
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		await queue.seek(hmsToMiliseconds(query));
		await interaction.reply({ content: `⏩ | Seeking to ${query}`});
	},*/
	async execute(interaction, client) {
		//seek is temporarily disabled
		return await interaction.reply({ content: "Seek is temporarily disabled!", ephemeral: true });
	},
};