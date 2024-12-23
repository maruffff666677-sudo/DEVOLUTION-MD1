const axios = require('axios');

module.exports = {
   command: "claude",
   alias: ["sonet"],
   category: ["ai"],
   settings: {
      limit: true
   },
   description: "✨ *Chat Dengan Claude 3.5 Sonnet* ✨",
   loading: true,
   async run(m, { text, config }) {
      if (!text) return m.reply("❌ *Masukkan pertanyaan yang ingin kamu ajukan ke Claude!*");

      try {
         const response = await axios.get(`https://anira.site/api/ai/claude?q=${text}&apikey=` + config.apikey);
         const result = response.data.result;

         if (result) {
            await m.reply(`💬 *Claude 3.5 Sonnet*\n\n${result}`);
         } else {
            await m.reply("⚠️ *Claude tidak memberikan jawaban. Coba lagi nanti!*");
         }
      } catch (error) {
         await m.reply("🚨 *Terjadi kesalahan saat memproses permintaanmu. Harap coba lagi!*" + error.message);
      }
   }
};