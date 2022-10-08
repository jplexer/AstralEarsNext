module.exports = {
     name: 'interactionCreate',
     async execute(interaction) {
        if (!interaction.isCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) return;
    
        try {
            await command.execute(interaction, interaction.client);
        } catch (error) {
            console.error(error);
            await interaction.channel.send(`The command "${interaction.commandName}" couldn't be executed. Please try again`);
        }
     },
};
    