const axios = require('axios');

module.exports = {
   command: "latukam",
   alias: ["lat-ai"],
   category: ["ai"],
   settings: {
      limit: true
   },
   description: "Chat dengan Latukam Sang Jomok, Dapatkan Jawaban yang Menakjubkan!",
   loading: true,
   async run(m, { text }) {
     if (!text) {
       return m.reply("✨ *Masukkan Pertanyaan Anda Kepada Latukam Sang Jomok!* ✨");
     }
     try {
        let ai = await axios.get(`https://api.siputzx.my.id/ai/latukam?content=${text}`);
        let response = ai.data.data;
        let data = response.replace(/\*\*/g, "*");
        await m.reply(data);
     } catch (error) {
        m.reply(`❌ *Terjadi Kesalahan, Coba Lagi!* ❌\nPesan kesalahan: *${error.message}*`);
     }
   }
}