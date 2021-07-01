const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')
const gallina = new db.crearDB('gallina')
const caña = new db.crearDB('caña')

module.exports = {
  name: "buy", 
  alias: [],

async execute (client, message, args){

  const user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, { "cash": 0, "bank": 0})
  }
  const dinero = await economia.obtener(`${user.id}.cash`)
  const asd = args.join(' ')
  if(!asd) return message.lineReply("Debes decir el item de la tienda que quieres comprar.")
  const item = asd.toUpperCase()

  if(item === 'GALLINA'){
      if(dinero < 600)return message.lineReply("No puedes comprar este item,no tienes el suficiente dinero para hacerlo!")
      if(gallina.has(user.id))return message.lineReply("Ya posees una gallina")
      gallina.establecer(user.id, 'true')
      economia.restar(`${user.id}.cash`, 600)
      message.lineReply("Has comprado el item **Gallina**,ahora tienes acceso a el comando p!cf")
  } else{
      if(item === 'CAÑA'){
          if(dinero < 2000)return message.lineReply("No tienes suficiente dinero.")
          if(caña.has(user.id))return message.lineReply("Ya tienes una caña en tu inventario")
          caña.establecer(user.id, 'true')
          economia.restar(`${user.id}.cash`, 2000)
      } else{
          message.lineReply("Este item no existe,consulte los items de este servidor con el comando p!shop")
      }
  }

 }

}