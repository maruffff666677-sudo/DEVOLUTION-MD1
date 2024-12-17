const axios = require('axios');

module.exports = {
   command: "artgenerator",
   alias: ["art"],
   category: ["ai"],
   settings: {
      group: true
   },
   description: "🎨 *Buat Art Anda Dengan Hanya Prompt* ✨",
   async run(m, { text, sock, config }) {
      if (!text) {
         return m.reply("⚡ *Masukkan Prompt Anda Agar Di Proses...* ⚡");
      }
      try {
         await m.reply(`💫 *Memproses Art Dengan Prompt:* _${text}_ 🎨`);
         let data = await axios.get(`https://aniravecdo.online/api/ai/artgen?q=${text}&apikey=` + config.apikey);
         let hasil = data.data.result;
         let randomImage = hasil[Math.floor(Math.random() * hasil.length)];
         await sock.sendMessage(m.cht, { image: { url: randomImage }, caption: "🔥 *Art Anda Sudah Jadi!* 🔥" }, { quoted: m });
      } catch (error) {
         m.reply("❌ *Terjadi Kesalahan! Coba Lagi Nanti.* ❌");
      }
   }
};