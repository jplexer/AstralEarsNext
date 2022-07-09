const { MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
    async createVote (interaction, client) {
    var guildId = interaction.guildId;
    var queue = client.player.getQueue(interaction.guildId);
    var skipSuccessful = false;
    const row = new MessageActionRow()
    .addComponents(
        new MessageButton()
            .setCustomId('accept')
            .setLabel('Accept Skip')
            .setStyle('SUCCESS'),
    );
    console.log(queue.metadata.voteSkippers);
    await interaction.reply({ content: "Votes required to skip: " + (queue.metadata.requiredVoteSkippers - queue.metadata.voteSkippers.length), components: [row] });
    
    const collector = interaction.channel.createMessageComponentCollector({ componentType: 'BUTTON', time: 60000 });

    collector.on('collect', i => {
        if(queue.metadata.requiredVoteSkippers === 0) {
            return;
        }
        if (queue.metadata.voteSkippers.includes(i.user.id)){
            i.reply({ content: "You have already voted to skip this song!", ephemeral: true });
            return;
        }
        if (i.component.customId === 'accept') {
            queue.metadata.voteSkippers.push(i.user.id);
            if (queue.metadata.voteSkippers.length >= queue.metadata.requiredVoteSkippers) {
                queue.skip();
                i.reply({ content: "Skipping..."});
                i.update({ content: "Skip successful!" , components: []});
                skipSuccessful = true;
                queue.metadata.requiredVoteSkippers = 0;
            } else {
                i.reply({ content: "Vote accepted! Votes required to skip: " + (queue.metadata.requiredVoteSkippers - queue.metadata.voteSkippers.length) });
            }
        }
    });

    collector.on('end', collected => {
	    if(skipSuccessful || queue.metadata.requiredVoteSkippers == 0) {
            return;
        } else {
            queue.metadata.requiredVoteSkippers = Math.floor((interaction.member.voice.channel.members.size - 1) / 2);
            queue.metadata.voteSkippers = [];
            //interaction.update({ content: "Voteskip failed. Votes reset!", components: [] });
            interaction.followUp({ content: "Voteskip failed. Votes reset!" });
        }
    });
}
    
}