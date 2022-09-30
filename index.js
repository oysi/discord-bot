
// import * as discordjs from "discord.js"

import * as discordjs from "discord.js"
import * as discordv from "@discordjs/voice"

import * as dotenv from "dotenv"

dotenv.config();

const client = new discordjs.Client({
	intents: [
		discordjs.GatewayIntentBits.Guilds,
		discordjs.GatewayIntentBits.GuildMessages,
		discordjs.GatewayIntentBits.GuildVoiceStates,
	],
});

client.on("ready", () => {
	console.log("The bot is ready");
});

client.on("messageCreate", (message) => {
	console.log("messageCreate", message)
});

client.on("voiceStateUpdate", (oldState, newState) => {
	if (oldState.channelId == null && newState.channelId != null) {
		console.log("Joined");
		// console.log(newState);
		
		// const channel = client.channels.get(newState.channelId);
		// console.log("channel", channel);
		// console.log(newState.guild.channels);
		
		const connection = discordv.joinVoiceChannel({
			guildID: newState.guild.id,
			channelId: newState.channelId,
			adapterCreator: newState.guild.voiceAdapterCreator,
		});
		
		console.log(connection);
	}
});

client.login(process.env.TOKEN);
