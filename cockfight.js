const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')
const gallina = new db.crearDB('gallina')

module.exports = {
  name: "cockfight", 
  alias: ["cf"],

async execute (client, message, args){

  let user = message.author;

  const dinero = await economia.obtener(`${user.id}.cash`)
  let probabilidad = Math.floor(Math.random() * 100)
  if(gallina.has(user.id)){
      if(dinero <= 0)return message.lineReply("No puedes apostar menos de 0")
      const cantidad = args[0]
      if(!cantidad)return message.lineReply("Debes decir la cantidad que quieres apostar <cantidad | all>")
      if(cantidad ==='all'){
        if(probabilidad > 50){
            economia.sumar(`${user.id}.cash`, dinero)
            message.lineReply("Tu gallina ha sobrevivido a la pelea y has obtenido **$'+dinero+'**")
        } else{
            ecoonomia.restar(`${user.id}.cash`, dinero)
            gallina.delete(user.id)
            message.lineReply("Tu gallina ha muerto y has perdido el dinero apostado")
        }
    } else{
        const cant = parseInt(cantidad)
        if(isNaN(cant))return message.lineReply("Debes decir un numero valido para apostar")
        if(probabilidad > 50){
            economia.sumar(`${user.id}.cash`, cant)
            message.lineReply("Tu gallina ha sobrevivido y has obtenido **$'+cant+'**")
        } else{
            economia.restar(`${user.id}.cash`, cant)
            gallina.delete(user.id)
            message.lineReply("Tu gallina no ha sobrevivido y has perdido el dinero apostado")
        }
    }
  }else{
      message.lineReply("No posees una gallina,puedes comprarla con el comando p!buy GALLINA")
  }

 }

} 