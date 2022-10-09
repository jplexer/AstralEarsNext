const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('remove')
		.setDescription('mistakes happen')
        .addIntegerOption(option => option.setName('tracknumber').setDescription('Number of the track you want to remove').setRequired(true)),
	async execute(interaction, client) {
		const query = interaction.options.get("tracknumber").value;
        var queue = client.player.getQueue(interaction.guildId);
        if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
        if (queue.tracks == []) {
            return await interaction.reply({ content: "There is nothing to remove", ephemeral: true });
        } else if (query <= 0 || query > queue.tracks.length) {
            return await interaction.reply({ content: "That isn't possible", ephemeral: true });
        } else {
            await interaction.reply({ content: `Removed ${queue.tracks[query - 1].title}`});
            queue.remove(query - 1)
        }
	},
};