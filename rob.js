const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')
const used = new Map();
const Duration = require('humanize-duration')

module.exports = {
  name: "rob", 
  alias: [],

async execute (client, message, args){

    ///COOLDOWN////

  const cooldown = used.get(message.author.id)
  
  if(cooldown){
      const remaining = Duration(cooldown - Date.now(), { units: ['h', 'm', 's'], language: 'es', conjunction: ' y ', serialComma: false, round: true})

      return message.lineReply(`Necesitas esperar **${remaining}** para volver a robar`).then(async(msg) => {
          setTimeout(() => {
              msg.delete()
          }, 5000)
      });
  }

  ///SUJETOS//////

  const user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }

  const victima = message.mentions.users.first()

  if(!economia.has(victima.id)){
    economia.set(victima.id, {"cash": 0, "bank": 0})
}

if(!victima)return message.lineReply("Error: Debes mencionar a un usuario para robarle")
if(victima.id === user.id)return message.lineReply("No puedes robarte a ti mismo!")

let userbal = await economia.obtener(`${user.id}.cash`)
let vicbal = await economia.obtener(`${victima.id}.cash`)
let probabilidad = Math.floor(Math.random() * 100)
let vicran = Math.floor(Math.random() * vicbal)
let userran = Math.floor(Math.random() * userbal)

if(vicbal < 100)return message.lineReply("Error: no puedes robarle a usuarios con menos de **$100**")

if(probabilidad > 70){
    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`Felicidades ${user} has robado a ${victima} y has obtenido **${vicran}**`)

    economia.sumar(`${user.id}.cash`, vicran)
    economia.restar(`${victima.id}.cash`, vicran)
    message.lineReply(embed)
    used.set(message.author.id, Date.now() + 1000 * 60 * 30);
    setTimeout(() => used.delete(message.author.id),1000 * 60 * 30)
} else{
    const embed = new Discord.MessageEmbed()
    .setAuthor(user.tag, user.avatarURL())
    .setColor("RANDOM")
    .setDescription(`Has intentado robarle a ${victima} y gracias a eso perdiste ${userran}`)

    economia.restar(`${user.id}.cash`, vicran)
    message.lineReply(embed)
    used.set(message.author.id, Date.now() + 1000 * 60 * 30);
    setTimeout(() => used.delete(message.author.id),1000 * 60 * 30)
}

 }

} 