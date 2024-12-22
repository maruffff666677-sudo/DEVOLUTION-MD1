const axios = require('axios');

module.exports = {
   command: "gpt-o",
   alias: ["gpt-o"],
   category: ["ai"],
   settings: {
      group: true,
      limit: true
   },
   description: "💬 Berbicara Dengan Gpt4-o",
   async run(m, { text, config }) {
      if (!text) {
         return m.reply("⚡ *Masukkan Pertanyaan Kepada Gpt* ⚡");
      }
      try {
         let response = await axios.get(`https://aniravecdo.online/api/ai/gpt?q=${text}&apikey=${config.apikey}`);
         let result = response.data.result;

         if (result) {
            await m.reply(`${result}`);
         } else {
            await m.reply("❌ *Tidak ada hasil dari GPT-4, coba lagi nanti!* ❌");
         }
      } catch (error) {
         console.error(error);
         m.reply("❌ *Terjadi kesalahan saat menghubungi GPT-4, coba lagi nanti!* ❌");
      }
   }
};