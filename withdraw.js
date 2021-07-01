const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')

module.exports = {
  name: "withdraw", 
  alias: ["with"],

async execute (client, message, args){

  const user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }

  const dinero = await economia.obtener(`${user.id}.cash`)
  const banco = await economia.obtener(`${user.id}.bank`)
  const cantidad = args[0]

  const embed = new Discord.MessageEmbed()
  .setAuthor(user.tag, user.avatarURL())
  .setColor("RANDOM")

  if(!cantidad) return message.lineReply(`Debes especificar una cantidad`)
    if(cantidad > banco)return message.lineReply("No puedes despositar mas dinero de el que dispones")
    if(isNaN(cantidad))return message.lineReply("Eso no es un numero valido")
    economia.restar(`${user.id}.bank`, banco)
      economia.sumar(`${user.id}.cash`, cantidad)
      message.lineReply(`Listo ${user} has retirado ${cantidad} de el banco`)
  

 }

} 