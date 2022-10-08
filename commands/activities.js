const {
	SlashCommandBuilder
} = require('@discordjs/builders');
const { MessageEmbed,  MessageActionRow, MessageButton } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('activities')
		.setDescription('eating seeds as a discord activity')
		.addStringOption(option =>
            option.setName('type')
                .setDescription('The type of activity to summon')
                .setRequired(true)
                .addChoices(
                    { name: 'Youtube', value: 'youtube' },
                    { name: 'Poker', value: 'poker' },
                    { name: 'Chess', value: 'chess' },
                    { name: 'Betrayal', value: 'betrayal' },
                    { name: 'fishington', value: 'fishing' },
                    { name: 'Letter Tile', value: 'lettertile'},
                    { name: 'Words Snack', value: 'wordsnack' },
                    { name: 'Doodle Crew', value: 'doodlecrew' },
                    { name: 'SpellCast', value: 'spellcast' },
                    { name: 'Awkword', value: 'awkword' },
                )),
	async execute(interaction, client) {
        const command = interaction.options.getString("type");
        if (!interaction.member.voice.channel) return interaction.reply({ content: "You need to join a voice channel.", ephemeral: true });
            client.discordTogether.createTogetherCode(interaction.member.voice.channel.id, command).then(async invite => {
                if(invite.code == "https://discord.com/invite/50013") {
                    return interaction.reply("The bot has no permission to create a Invite. Please reinvite AstralEars at https://jplexer.omg.lol/astralears")
                }
                return interaction.reply(`${invite.code}`);
            })
    }
};