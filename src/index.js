/**
 * @author Noël Vissers - Noedel#0001
 * @version 1.0.0
 * @git 
 * invite: https://discord.com/api/oauth2/authorize?client_id=790950081502904343&scope=bot
 * Start: npm start
 * Debug: nodemon ./src/index.js
 */

const Discord = require('discord.js');
const client = new Discord.Client();
client.commands = new Discord.Collection();
const { prefix, token, bot_info } = require('../config.json');

client.once('ready', () => {
  console.log(`[Ready]\nTAG: ${client.user.tag}\nNAME: ${bot_info.name}\nVERSION: ${bot_info.version}`);
})

client.on('message', (message) => {
  if (message.author.bot) return;
  if (message.content.startsWith(prefix)) {
    const [command, ...args] = message.content
      .trim()
      .substring(prefix.length)
      .split(/\s+/);

    switch (command.toUpperCase()) {
      case "HELP":
        {
          message.channel.send('Usage: `!userinfo < id | @user >`');
        } break;
      case "USERINFO":
        {
          let toFind = args[0];
          let member;

          if (!member && message.mentions.members)
            member = message.mentions.members.first();
          if (!member && toFind)
            member = message.guild.members.cache.get(toFind);
          if (!member)
            {
              if(toFind)
              {
                message.channel.send("User not found...");
                return;
              }
              member = message.member;
            }

          const embed = new Discord.MessageEmbed();
          embed.setFooter(`User ID: ${member.user.id}`);
          embed.setColor('0x6058f3');

          embed.setTitle(`${member.user.username}#${member.user.discriminator}`);
          embed.addField('Status', member.user.presence.status);
          if (member.user.presence.clientStatus)
          {
            let web = member.user.presence.clientStatus.web;
            if(!web) web = '-';
            let mobile = member.user.presence.clientStatus.mobile;
            if(!mobile) mobile = '-';
            let desktop = member.user.presence.clientStatus.desktop;
            if(!desktop) desktop = '-';

            embed.addField('Clients', `Web: \`${web}\`\nMobile: \`${mobile}\`\nDesktop: \`${desktop}\``);
          }

          message.channel.send(embed);
        } break;
      default:
        return;
    }
  }
})

client.login(token);