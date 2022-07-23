const fs = require("node:fs");
const path = require("node:path");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Config = require("./config.json");

const commands = [];
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath);
  commands.push(command.data.toJSON());
}

const rest = new REST({ version: "9" }).setToken(Config.TOKEN);

if (Config.ENV == "dev") {
  // local (with a guild id)
  rest
    .put(Routes.applicationGuildCommands(Config.APP_ID, Config.GUILD_ID), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands locally."))
    .catch(console.error);
} else {
  // global (only requires the app id)
  rest
    .put(Routes.applicationCommands(Config.APP_ID), {
      body: commands,
    })
    .then(() => console.log("Successfully registered application commands globally."))
    .catch(console.error);
}
