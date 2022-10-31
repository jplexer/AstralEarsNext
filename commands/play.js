const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js');
const { color, name, version} = require('../config.json');
const downloader = require("@discord-player/downloader").Downloader;
const playdl = require("play-dl");
module.exports = {
    data: new SlashCommandBuilder()
    .setName('play')
    .setDescription(`let's groove tonight`)
    .addStringOption(option => option.setName('input').setDescription('Link or Name').setRequired(true)),
	async execute(interaction, client) {
        if (!interaction.member.voice.channelId) return await interaction.reply({ content: "You are not in a voice channel!", ephemeral: true });
        if (interaction.guild.members.me.voice.channelId && (interaction.member.voice.channelId !== interaction.guild.members.me.voice.channelId)) return await interaction.reply({ content: "You are not in my voice channel!", ephemeral: true });
        const query = interaction.options.get("input").value;
        const queue = client.player.createQueue(interaction.guild, {
            metadata: {
                channel: interaction.channel
            },
            spotifyBridge: true,
            async onBeforeCreateStream(track, source, _queue) {
                if (source === "youtube") {
                    // youtube is broken for some reason
                    // so we use playdl

                    return (await playdl.stream(track.url, { discordPlayerCompatibility : true })).stream;
                }
            }
        });
        
        // verify vc connection
        try {
            if (!queue.connection) await queue.connect(interaction.member.voice.channel);
        } catch {
            queue.destroy();
            return await interaction.reply({ content: "Could not join your voice channel!", ephemeral: true });
        }

        await interaction.deferReply();
        const track = await client.player.search(query, {
            requestedBy: interaction.user
        })//.then(x => x.tracks[0]);
        if (!track) return await interaction.followUp({ content: `❌ | Track **${query}** not found` });
        try {
        if (track.tracks.length === 0) return await interaction.followUp({ content: `❌ | Track **${query}** not found` });
        if(track.playlist) {
            queue.addTracks(track.tracks)
            if (!queue.playing) await queue.play();
            return await interaction.followUp({ content: `⏱️ | Queueing playlist **${track.playlist.title}** with **${track.tracks.length}** tracks`});
        } else {
            queue.addTrack(track.tracks[0]);
            if (!queue.playing) await queue.play();
            return await interaction.followUp({ content: `⏱️ | Queueing track **${track.tracks[0].title}**`});
        }        
    } catch (err) {
        return await console.log(err);
    }
	},
};