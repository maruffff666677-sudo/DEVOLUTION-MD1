module.exports = {
   command: "restart",
   alias: ["restart-bot"],
   category: ["owner"],
   settings: {
      owner: true
   },
   loading: true,
   async run(m, { sock }) {
      try {
         await m.reply("🔴 Bot Akan Melakukan Restart Mohon Tunggu...")
         await sleep(3000)
         process.exit()
         await sleep(3000)
         await sock.sendMessage(m.sender, { text: "Bot Berhasil Melakukan Restart, Kini Bot Tidak Lag Lagi📸"}, { quoted: m })
      } catch (e) {
         console.warn(e.message)
         return m.reply("Server Is Busy")
      }
   }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}