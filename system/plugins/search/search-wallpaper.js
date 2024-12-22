module.exports = {
   command: "wallpaper",
   alias: ["wallpppr"],
   category: ["search"],
   settings: {
      limit: true
   },
   loading: true,
   async run(m, { Scraper, text, sock }) {
      if (!text) {
         return m.reply("Masukkan Query Pencarian Anda")
      }
      try {
         let scrape = await Scraper.wallpaper.wallpapers(text);
         if (scrape.length === 0) {
            return m.reply(`*Tidak Ada Hasil Untuk Pencarian ${text} Coba Masukkan Query Lainnya*`)
         }
         let result = scrape[0];
         let imageUrl = result.imageUrl;
         if (!imageUrl) {
            return m.reply("Tidak Ada Gambar Ditemukan 😞")
         }
         let title = result.title;
         await sock.sendMessage(
           m.cht,
           {
             image: {
                url: imageUrl
             },
             caption: title
           },
           {
             quoted: m 
           }
         )
      } catch (e) {
         console.error("Wahh Bree Terjadi Error Nih🤣 Perbaiki Ya🤣", e.message)
         return m.reply("Upss Terjadi Error Saat Menghubungi Website 🤔")
      }
   }
}