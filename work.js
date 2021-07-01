const Discord = require('discord.js');
const client = new Discord.Client();
const { Client, MessageEmbed } = require('discord.js');
const db = require('megadb')
const lineReply = require('discord-reply')
const economia = new db.crearDB('economia')
const used = new Map();
const Duration = require('humanize-duration')

module.exports = {
  name: "work", 
  alias: [],

async execute (client, message, args){

  const cooldown = used.get(message.author.id);
  if(cooldown){
      const remaining = Duration(cooldown - Date.now(), { units: ['h', 'm', 's'],lenguage: 'es', conjunction: ' y ', serialComma: false, round: true })
      return message.lineReply(`Necesitas esperar **${remaining}** para volver a trabajar`).then(async(msg) => {
          setTimeout(() => {
              msg.delete();
          }, 5000)
      });
  }
  let user = message.author;

  if(!economia.has(user.id)){
      economia.set(user.id, {"cash": 0, "bank": 0})
  }
  let mensajes = [`Bien hecho ${user} has trabajado repartiendo el periodico y has obtenido`, `Felicidades ${user} has trabajado de Editor y te han pagado`, `Felicidades ${user} trabajaste de bombero y has obtenido`, `Felicidades ${user} has trabajado de Policia y te han pagado`]


  ///RANDOMIZERS/////
  let probabilidades = Math.floor(Math.random() * 100)
  let random = Math.floor(Math.random() * (400 - 200) + 200)
  let msg = mensajes[Math.floor(Math.random() * mensajes.length)]

  economia.sumar(`${user.id}.cash`, random)

  const cashtotal = await economia.obtener(`${user.id}.cash`)
  const banktotal = await economia.obtener(`${user.id}.bank`)
  let total = cashtotal + banktotal

  const embed = new Discord.MessageEmbed()
  .setAuthor(user.tag, user.avatarURL())
  .setColor("GREEN")
  .setDescription(`${msg} **${random}**`)


  message.lineReply(embed)
  used.set(message.author.id, Date.now() + 1000 * 45);
  setTimeout(() => used.delete(message.author.id), 1000 * 45)

 }

} 