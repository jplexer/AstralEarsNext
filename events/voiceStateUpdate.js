const { getVoiceConnection } = require('@discordjs/voice')
const { QueueRepeatMode, Util } = require('discord-player')
module.exports = {
	name: 'voiceStateUpdate',
	async execute(oldState, newState) {
        
		const clientId = oldState.guild.members.me.id
        try {
			const queue = oldState.client.player.getQueue(oldState.guild.id)

			if (!queue || !queue.connection || !queue.connection.channel) {
				return
			}

			if (newState.channelId !== queue.connection.channel.id) {
				// user left music channel

				if (!Util.isVoiceEmpty(queue.connection.channel)) {
					// music channel not empty
					return
				}
				else if (queue._cooldownsTimeout.get(`empty_${oldState.guild.id}`)) {
					// empty timeout already running
					return
				}

				// start empty timeout because user disconnected from voice channel and noone else is there to listen
				const timeout = setTimeout(() => {
					if (!Util.isVoiceEmpty(queue.connection.channel)) {
						return
					}
					if (!oldState.client.player.queues.has(queue.guild.id)) {
						return
					}
					if (queue.options.leaveOnEmpty) {
						queue.repeatMode = QueueRepeatMode.OFF
						queue.destroy()
					}
					oldState.client.player.emit('channelEmpty', queue)
				}, queue.options.leaveOnEmptyCooldown || 0).unref()
				queue._cooldownsTimeout.set(`empty_${oldState.guild.id}`, timeout)
			}
			else if (newState.channelId === queue.connection.channel.id && newState.member?.id !== clientId) {
				// user joined channel with bot
				const emptyTimeout = queue._cooldownsTimeout.get(`empty_${oldState.guild.id}`)
				if (emptyTimeout) {
					// cancel empty timer because user joined voice channel with bot
					clearTimeout(emptyTimeout)
					queue._cooldownsTimeout.delete(`empty_${oldState.guild.id}`)
				}
			}
		}
		catch (err) {
			console.error(err)
		}
	},
};