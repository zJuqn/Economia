const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')

module.exports = {
  name: "deposit", 
  alias: ["dep"],

async execute (client, message, args){

    let user = message.author;

    if(!economia.has(user.id)){
        economia.set(user.id, {"cash": 0, "bank": 0})
    }

    const dinero = await economia.obtener(`${user.id}.cash`)
    const bank = await economia.obtener(`${user.id}.bank`)
    const cantidad = args[0]

    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.avatarURL())
    .setColor("RANDOM")

    if(!cantidad)return message.lineReply("Debes especificar una cantidad")
    
        if(cantidad > dinero)return message.lineReply(`No tienes esa cantidad de dinero para depositar`)
        if(isNaN(cantidad))return message.lineReply(`Error: Eso no es un valor valido,solo se permiten numeros`)
        economia.sumar(`${user.id}.bank`, cantidad)
        economia.restar(`${user.id}.cash`, cantidad)
        message.lineReply(`Listo ${user} has guardado **${cantidad}** en el banco`)

 }
} 