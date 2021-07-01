const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')
const caña = new  db.crearDB('caña')
const used = new Map();
const Duration = require('humanize-duration')

module.exports = {
  name: "fish", 
  alias: [],

async execute (client, message, args){

    const cooldown = used.get(message.author.id)

    if(cooldown){
        const reaming = Duration(cooldown - Date.now(), { units: ['h', 'm', 's'], language: 'es', conjunction: ' y ', serialComma: false, round: true} )
        return message.lineReply(`Necesitas esperar **${reaming}** para volver a utilizar este comando`).then(async (msg) => {
            setTimeout(() => {
                msg.delete()
            }, 5000)
        })
    }

  let user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }
  if(caña.has(user.id)){
      const usos = await caña.obtener(user.id)
      if(usos < 1)return message.lineReply("Tu caña se ha roto.compra una nueva")
      let probabilidad = Math.floor(Math.random() * 100)
      let pescado = Math.floor(Math.random() * (50 - 25) + 25)
      let rpescado = Math.floor(Math.random() * (150 - 60) + 60)
      let srpescado = Math.floor(Math.random() * (500 - 300) + 300)
      let tiburon = Math.floor(Math.random() * (1000 - 500) + 500)
      let cofre = Math.floor(Math.random() * (8000 - 7000) + 7000)
      if(probabilidad > 99.9){
          used.set(message.author.id, Date.now() + 1000 + 15)
          setTimeout(() => used.delete(message.author.id),1000 + 15)
          caña.restar(user.id, 1)
          economia.sumar(`${user.id}.cash`, cofre)
          return message.lineReply("Has atrapado un cofre en abandono\nDentro del cofre habia **$'+cofre+'**")
      }
      if(probabilidad > 95){
        used.set(message.author.id, Date.now() + 1000 + 15)
        setTimeout(() => used.delete(message.author.id),1000 + 15)
        caña.restar(user.id, 1)
        economia.sumar(`${user.id}.cash`, tiburon)
        return message.lineReply("Has atrapado un tiburon :shark: y lo vendes por **$'+tiburon+'**")
    }
    if(probabilidad > 80){
        used.set(message.author.id, Date.now() + 1000 + 15)
        setTimeout(() => used.delete(message.author.id),1000 + 15)
        caña.restar(user.id, 1)
        economia.sumar(`${user.id}.cash`, srpescado)
        return message.lineReply("Has atrapado 1 pescado super raro :tropical_sifh: y lo vendes por **$'+srpescado+'**")
    }
    if(probabilidad > 55){
        used.set(message.author.id, Date.now() + 1000 + 15)
        setTimeout(() => used.delete(message.author.id),1000 + 15)
        caña.restar(user.id, 1)
        economia.sumar(`${user.id}.cash`, rpescado)
        return message.lineReply("Has atrapado 1 pescado rado :blowfish: y lo vendes por **$'+rpescado+'**")
    }
    used.set(message.author.id, Date.now() + 1000 + 15)
        setTimeout(() => used.delete(message.author.id),1000 + 15)
        caña.restar(user.id, 1)
        economia.sumar(`${user.id}.cash`, pescado)
        message.lineReply("Has atrapado un pescado :fish: y lo vendes por **$'+pescado+'**")
  } else{
      message.lineReply("No tienes una caña,puedes comprar con el comando p!buy CAÑA")
  }



 }

} 