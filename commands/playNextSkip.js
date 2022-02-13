const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('playnextskip')
		.setDescription('i respect the queue, but i need to play this right now')
        .addStringOption(option => option.setName('input').setDescription('Link or Name').setRequired(true)),
    async execute(interaction, client) {
        var queue = client.player.getQueue(interaction.guildId);
        if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
        const query = interaction.options.get("input").value;
        await interaction.deferReply();
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        }).then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found!` , ephemeral: true});

        await queue.insert(track, 0);
        queue.skip();
        return await interaction.followUp({ content: `⏱️ | Queueing track **${track.title}**!`});
	},
};