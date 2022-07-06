const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
const { createVote } = require('../util/voteHandler');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('skip')
		.setDescription(`I don't like this`),
	async execute(interaction, client) {
		var queue = client.player.getQueue(interaction.guildId);
		if (!queue) {
			return await interaction.reply({ content: "You need to summon the Bot!", ephemeral: true });
		}
		if (interaction.guild.me.voice.channelId && interaction.member.voice.channelId !== interaction.guild.me.voice.channelId) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
		if (interaction.member.voice.channel.members.size <= 3) { 
			// If there is only one other person in the voice channel
			queue.skip();
			await interaction.reply({ content: "Skipping..."});
		} else if (queue.metadata.voteSkippers.includes(interaction.member.id)) {
			await interaction.reply({ content: "You have already voted to skip this song!", ephemeral: true });
			return;
		} else {
			// If there are more than one person in the voice channel
			if(queue.metadata.requiredVoteSkippers === 0) { 
				queue.metadata.requiredVoteSkippers = (Math.floor((interaction.member.voice.channel.members.size - 1) / 2));
			} 
			if (queue.metadata.voteSkippers.length === 0) {
				queue.metadata.voteSkippers.push(interaction.user.id);
				createVote(interaction, client);
				return;
			} 
			queue.metadata.voteSkippers.push(interaction.user.id);
			if (queue.metadata.voteSkippers.length >= queue.metadata.requiredVoteSkippers) {
                queue.skip();
                interaction.reply({ content: "Skipping..."});
                queue.metadata.requiredVoteSkippers = 0;
				return;
            } else {
				await interaction.reply({ content: "Vote accepted! Votes required to skip: " + (queue.metadata.requiredVoteSkippers - queue.metadata.voteSkippers.length) });
			}
			

			
		}
	},
};