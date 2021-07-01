const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')

module.exports = {
  name: "pay", 
  alias: [],

async execute (client, message, args){

  const user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }
  const dinero = await economia.obtener(`${user.id}.cash`)
  const cantidad = args[1]
  const sujeto = message.mentions.users.first()
  if(!economia.has(sujeto.id)){
      economia.set(sujeto.id, {"cash": 0, "bank": 0})
  }
  if(!sujeto)return message.lineReply("Debes mencionar a el usuario a quien enviaras el dinero")
  if(sujeto.id === user.id)return message.lineReply("No puedes pagarte dinero a tu mismo")
  if(!cantidad)return message.lineReply(`Debes decir una cantidad para enviar`)
  if(cantidad > dinero)return message.lineReply("No tienes tanto dinero para enviar")
  if(cantidad === 'all'){
      const embed = new Discord.MessageEmbed()

      .setAuthor(user.id, user.avatarURL())
      .setColor("RANDOM")
      .setDescription(`Has enviado **$'+dinero+'** a <@'+sujeto+'>`)
      economia.restar(`${user.id}.cash`, dinero)
      economia.sumar(`${sujeto.id}.bank`, dinero)
      message.lineReply(embed)
  } else{
      let dinerot = parseInt(cantidad)
      if(isNaN(dinerot))return message.lineReply('Ese no es un numero valido')
      const embed = new Discord.MessageEmbed()
      .setAuthor(user.tag, user.avatarURL())
      .setColor("GREEN")
      .setDescription('Has enviado **$'+dinerot+'** a <@'+sujeto+'>')
      economia.restar(`${user.id}.cash`, dinerot)
      economia.sumar(`${sujeto.id}.bank`, dinerot)
      message.lineReply(embed)
  }

 }

} 