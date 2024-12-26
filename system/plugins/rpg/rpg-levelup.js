let path = require('path');
let dataPath = path.join(process.cwd(), "lib", "levelling.js")
let levelling = require(dataPath)

module.exports = {
   command: "levelup",
   alias: ["uplevel"],
   category: ["rpg"],
   settings: {},
   loading: true,
   async run(m, { sock }) {
      let user = db.list().user[m.sender]
      if (!levelling.canLevelUp(user.level, user.exp, global.multiplier)) {
         let { min, xp, max } = levelling.xpRange(user.level, global.multiplier)
         throw `
Level *${user.level} (${user.exp - min}/${xp})*
Kurang *${max - user.exp}* lagi!
`.trim()
      }
      let before = user.level * 1
      while (levelling.canLevelUp(user.level, user.exp, global.multiplier)) user.level++
      if (before !== user.level) {
         m.reply(`
Selamat, anda telah naik level!
*${before}* -> *${user.level}*
`.trim())
      }
   }
}