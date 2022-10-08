const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed, EmbedBuilder } = require('discord.js');
const { color, name, version, githubRepo} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('all about that bass'),
	async execute(interaction) {
		let embed = new EmbedBuilder();
        embed.setTitle(`About ${name}`);
        embed.setDescription("This is a music bot originally made by vicr123, but is rewritten and maintained by JPlexer.");
        embed.setColor(color);
		embed.addFields([
			{ name: "License", value: `This bot is licensed under the GNU General Public License v3.0. You can find the full license [here](https://github.com/${githubRepo}/blob/master/LICENSE).`},
			{ name: "Source Code", value: `The source code for this bot is available on [GitHub](https://github.com/${githubRepo}).`},
		])
		embed.setFooter({text: `${name}  ${version}`});
		await interaction.reply({ embeds: [embed] });
	},
};