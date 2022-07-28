const {
  Interaction,
  Client,
  WebhookClient,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  name: "ufoApply",
  /**
   *
   * @param {Interaction} interaction
   * @param {Client} client
   */
  async execute(interaction, client) {
    try {
      const subToAlien = interaction.fields.getTextInputValue("subToAlien");
      const breakRules = interaction.fields.getTextInputValue("breakRules");
      const age = interaction.fields.getTextInputValue("age");
      const bedrockUsername =
        interaction.fields.getTextInputValue("bedrockUsername");
      const javaUsername = interaction.fields.getTextInputValue("javaUsername");

      const webhook = new WebhookClient({
        url: "https://discord.com/api/webhooks/1002265819721498807/XqF_Et2m3KlCB9tCQKYgJZg0XoiauwP_LMUHqfXAmGPzqhZ8MptFlsY0SfUEpK1EBNWY",
      });

      const embed = new EmbedBuilder()
        .setTitle("New UFO SMP Application")
        .setDescription("A member has applied to join UFO SMP")
        .setColor("Purple")
        .addFields(
          {
            name: "How long have you been subbed to Alien?",
            value: `\`\`\`${subToAlien}\`\`\``,
          },
          {
            name: "do you promise not to break any rules? (y/n)",
            value: `\`\`\`${breakRules}\`\`\``,
          },
          {
            name: "Are you over the age of 13? (y/n)",
            value: `\`\`\`${age}\`\`\``,
          },
          {
            name: "Minecraft Bedrock Username",
            value: `\`\`\`${bedrockUsername}\`\`\``,
          },
          {
            name: "Minecraft Java Username",
            value: `\`\`\`${javaUsername}\`\`\``,
          }
        )
        .setTimestamp()
        .setFooter({
          text: "UFO SMP • Alienbot",
          iconURL:
            "https://cdn.discordapp.com/app-icons/800089810525356072/b8b1bd81f906b2c309227c1f72ba8264.png?size=64&quot",
        });

      webhook.send({ embeds: [embed] });

      interaction.reply(
        "Your form has been submitted! It takes around 1 day for Alien to check your form and reply. you can do /ufosmp to get info about the UFOSMP!"
      );
    } catch (error) {
      console.error(error);
      return await interaction.reply(`There was an error: ${error}`);
    }
  },
};

console.log("modals/ufoApply.js run");
