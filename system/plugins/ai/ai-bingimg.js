const axios = require("axios");

module.exports = {
  command: "bingimg",
  alias: ["bingimg"],
  category: ["ai"],
  settings: {
    group: true
  },
  loading: true,
  description: "Request Foto Dari Bing",
  async run(m, { text, sock }) {

    if (!text) {
      return m.reply("Masukkan pertanyaan Anda untuk BingImg, contoh: *Kucing Lucu*");
    }

    try {
    let pee = await axios.get(`https://restapii.rioooxdzz.web.id/api/bingimg?message=${text}`);
      let BingimgResponse = pee.data.data.response;
      if (BingimgResponse) {
        await sock.sendMessage(
          m.cht,
          {
            image: { url: BingimgResponse },
            caption: `Hasil untuk: ${text}`,
          },
          { quoted: m }
        );
      } else {
        return m.reply("Tidak ada hasil dari BingImg.");
      }
    } catch (e) {
      console.error("Error:", e.message);
      return m.reply("BingImg sedang maintenance atau terjadi kesalahan.");
    }
  },
};