const { SlashCommandBuilder } = require("@discordjs/builders");

 module.exports = {
   data: new SlashCommandBuilder()
     .setName("ufosmp")
    .setDescription("Info about the UFO SMP"),
   async execute(interaction) {
     await interaction.reply("UFO SMP is a server run by alien for his discord! Want to join us? But your on bedrock? FEAR NOT! It runs GeyserMC for crossplay. Still want to join? Get to level 3 (`!rank`) and apply through #create-a-ticket :D"
     );
   },
};

//module.exports = {
//	data: new SlashCommandBuilder()
//		.setName('woofwoof')
//		.setDescription('The bot goes woof.'),
//	async execute(interaction) {
//		await interaction.reply('WOOF. WOOF WOOF WOOF. WOOFWOOFWOOFBARK');
//	},
//};

console.log("ufosmp.js run");
