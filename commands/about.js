const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('about')
		.setDescription('all about that bass'),
	async execute(interaction) {
		let embed = new MessageEmbed();
        embed.setTitle(`About ${name}`);
        embed.setDescription("This is a music bot originally developed by vicr123, but now revived and maintained by JPlexer.");
        embed.setColor(color);
        embed.addField("License", "This Bot is licenced under the GPL v3 License.");
        embed.addField("Github", "The Source Code of the bot is available at https://github.com/JPlexer/AstralEarsNext");
		embed.setFooter({text: `${name}  ${version}`});
		await interaction.reply({ embeds: [embed] });
	},
};