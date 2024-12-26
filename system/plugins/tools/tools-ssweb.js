const axios = require('axios');

module.exports = {
   command: "ssweb",
   alias: ["webss"],
   category: ["tools"],
   settings: {
      limit: true,
   },
   loading: true,
   description: "Ambil screenshot dari website menggunakan URL yang valid.",
   async run(m, { text, sock, Func }) {
      if (!text) {
         return m.reply("🛑 Awali teks dengan *https://*, dong! Jangan ngasal, bree! 🤣✊");
      }
      if (!Func.isUrl(text)) {
         return m.reply("😑 Bree, lu ngerti gak sih? URL harus valid! 🤣✊");
      }
      try {
         let { data: buffer } = await axios.get(
            `https://server.apisanz.my.id/tools/ssweb?text=${text}`,
            { responseType: 'arraybuffer' }
         );
         await sock.sendMessage(m.cht, { image: buffer, caption: `✅ Sukses Screenshot Web: ${text}` }, { quoted: m });
      } catch (err) {
         m.reply("❌ Gagal mengambil screenshot. Coba lagi nanti, bree! ✊");
      }
   },
};