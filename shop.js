const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')

module.exports = {
  name: "shop", 
  alias: [],

async execute (client, message, args){

  const user = message.author;
  if(!economia.has(user.id)){
      economia.set(user.id, { "cash": 0, "bank": 0})
  }

  const embed = new Discord.MessageEmbed()
  .setAuthor(user.tag, user.avatarURL())
  .setTitle('Tienda')
  .setDescription(`**$600** | Gallina \n**2000** | Caña de pescar`)
  .setFooter('Compra cualquier de estos items usando p!buy <item>')
  .setTimestamp()
  .setColor("ORANGE")

  message.lineReply(embed)

 }

} 