module.exports = {
   command: "livechart",
   alias: ["chart"],
   category: ["anime"],
   settings: {
      limit: true
   },
   loading: true,
   async run(m, { Scraper, text, sock }) {
      if (!text) {
         return m.reply("*Masukkan judul anime yang ingin dicari.*");
      }

      try {
         let scrape = await Scraper.livechart.liveChart(text);
         if (scrape.length === 0) {
            return m.reply(`*Anime dengan judul "${text}" tidak ditemukan.*`);
         }

         let limit = scrape.length < 5 ? scrape.length : 5;
         let response = scrape.slice(0, limit).map((anime, index) => {
            return `*${index + 1}. ${anime.title}*\n🎬 *Tanggal Rilis:* ${anime.premiere}\n⭐ *Rating:* ${anime.rating}\n🔗 *Link:* ${anime.link})\n`;
         }).join("\n");

         await sock.sendMessage(m.cht, {
            image: { url: scrape[0].poster },
            caption: `*Hasil Pencarian untuk "${text}"*\n\n${response}`
         }, { quoted: m });
      } catch (error) {
         m.reply("*Terjadi kesalahan saat memproses data.*");
      }
   }
};