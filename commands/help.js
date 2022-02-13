const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('help')
		.setDescription('I need somebody!'),
		async execute(interaction) {
			let embed = new MessageEmbed();
				embed.setTitle( name+ " Help");
				embed.setDescription("Here are some things you can try.");
				embed.setColor(color);
				embed.addField("Enqueue an item", "To enqueue an item, simply place the search query or URL after the slash command. For example,\n /play https://www.youtube.com/watch?v=dQw4w9WgXcQ\n /play DiscoVision");
				embed.addField("Seeking", "When wanting to skip to a specific timestamp, you can use the /seek command with a mm:ss format.");
				embed.addField("Inserting", "You can force a track to play next by using /playnext or also skip the track currently playing by using /playnextskip");
				embed.addField("Removing", "You can remove a track by executing /remove [tracknumber]. You can get the track number through /queue");
				embed.setFooter({text: `${name} ${version}`});
				await interaction.reply({ embeds: [embed] });
	},
};