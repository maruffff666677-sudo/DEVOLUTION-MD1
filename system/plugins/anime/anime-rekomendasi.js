const MyAnimeList = require("./path-to-myanimelist");

module.exports = {
   command: "rekom-anime",
   alias: ["rekomendasi-anime"],
   category: ["anime"],
   settings: {
      limit: true,
   },
   loading: true,
   async run(m, { Scraper, text, sock }) {
      let validGenres = [
         "Action",
         "Adventure",
         "Avant Garde",
         "Award Winning",
         "Boys Love",
         "Comedy",
         "Drama",
         "Fantasy",
         "Girls Love",
         "Gourmet",
         "Horror",
         "Mystery",
         "Romance",
         "Sci-Fi",
         "Slice of Life",
         "Sports",
         "Supernatural",
         "Suspense",
      ];

      if (!text) {
         return m.reply(`Masukkan genre anime yang ingin direkomendasikan. Berikut genre yang valid: ${validGenres.join(", ")}`);
      }

      if (!validGenres.includes(text)) {
         return m.reply(`Genre "${text}" tidak valid. Berikut genre yang valid: ${validGenres.join(", ")}`);
      }

      try {
         const results = await Scraper.MyAnimeList.tags(text.toLowerCase());
         if (typeof results === "string") {
            return m.reply(results);
         }

         let message = `*Rekomendasi Anime dengan Genre "${text}":*\n\n`;
         results.slice(0, 5).forEach((anime, i) => {
            message += `*${i + 1}. ${anime.title}*\n`;
            message += `> Skor: ${anime.score}\n`;
            message += `> Anggota: ${anime.members}\n`;
            message += `> Genre: ${anime.genres.join(", ")}\n`;
            message += `> Sinopsis: ${anime.synopsis.slice(0, 150)}...\n`;
            message += `> [Lihat detail](${anime.url})\n\n`;
         });

         if (results.length > 5) {
            message += `_Menampilkan 5 dari ${results.length} hasil._`;
         }

         await sock.sendMessage(m.cht, { text: message }, { quoted: m });
      } catch (error) {
         m.reply(`Terjadi kesalahan: ${error.message}`);
      }
   },
};