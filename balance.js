const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')

module.exports = {
  name: "balance", 
  alias: ["bal"],

async execute (client, message, args){

  let user = message.mentions.users.first() || message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }
  const cashtotal = await economia.obtener(`${user.id}.cash`)
  const banktotal = await economia.obtener(`${user.id}.bank`)
  let total = cashtotal + banktotal

  const embed = new Discord.MessageEmbed()
  .setAuthor(`${user.tag}`, user.avatarURL())
  .setDescription(`Balance de ${user.tag}`)
  .addField("Cash", `${cashtotal}`)
  .addField("Bank", `${banktotal}`)
  .addField("Dinero Total", `${total}`)
  .setColor("PINK")
  .setThumbnail(user.avatarURL())
  message.lineReply(embed)


 }

} 