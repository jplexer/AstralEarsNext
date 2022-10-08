module.exports = {
	name: 'ready',
	once: true,
	execute(client) {
		console.log(`${client.name} is all ears!`);
	},
};